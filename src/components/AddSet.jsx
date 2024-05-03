import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AddSet = ({ exercises }) => {
    const [selectedExercise, setSelected] = useState([{ name: null, balance: null }]);
    const [isBtnReady, setBtnAvailability] = useState(true);
    const { user } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        setBtnAvailability(false);
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/set/create`,
            { method: form.method, body: JSON.stringify(Object.fromEntries(formData.entries())), headers: { "Content-Type": "application/json" } });
        const { message } = response.json();
        message ? alert("Add Set Failed", message) : alert('Add Set Success')
        setBtnAvailability(true);
    }

    async function handleSelectedExercise(val) {
        const exercise = exercises.filter(exercise => exercise.name === val.target.value.split(':')[0])[0];
        setSelected(exercise);
    }

    // const optionsList = exercises.map((entry, i) => <option value={entry.name + ":" + entry._id} key={`exercise-${i}`}>{entry.name}</option>);

    return (
        <form method="post" onSubmit={handleSubmit}>
            <h2 className="form-title">Log Set</h2>
            <div className="form-group">
                <label>Date</label>
                <input name="date_and_time" type="date" />
            </div>
            <div className="form-group">
                <label>Select an exercise: </label>
                <select value={selectedExercise.name} onChange={(e) => handleSelectedExercise(e)} name="selectedExercise">
                    <option>Choose an option</option>
                    {exercises.map((entry, i) => <option value={entry.name + ":" + entry._id} key={`exercise-${i}`}>{entry.name}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label>Weight in lbs: </label>
                <input name="set_weight" type="number" />
            </div>
            { selectedExercise && selectedExercise.balance === 'asymmetrical' ?
                <div className="form-group">
                    <label>Right Side Reps: </label>
                    <input name="right_reps" type="number" />
                    <label>Left Side Reps: </label>
                    <input name="left_reps" type="number" />
                </div>
                :
                <div className="form-group">
                    <label>Reps or Seconds held: </label>
                    <input name="total_reps" type="number" />
                </div>
            }
            <div className="action-container">
                <button className="action-container__btn--secondary" type="reset">Reset</button>
                <button disabled={!isBtnReady} className="action-container__btn--primary" type="save">Save</button>
            </div>
        </form>
    );
}


export default AddSet;