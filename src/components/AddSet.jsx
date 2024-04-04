import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AddSet = () => {
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelected] = useState([{ name: null, balance: null }]);
    const { user } = useAuth();
    useEffect(() => {
        async function getData() {
            const response = await fetch(`${process.env.REACT_APP_SERVER}api/gains/exercises`);
            const data = await response.json();
            setExercises([...data]);
        }
        getData();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        fetch(`${process.env.REACT_APP_SERVER}api/profiles/${user._id}/set/create`,
            { method: form.method, body: JSON.stringify(Object.fromEntries(formData.entries())), headers: { "Content-Type": "application/json" } })
            .then(response => response.json())
    }

    async function handleSelectedExercise(val) {
        const exercise = exercises.filter(exercise => exercise.name === val.target.value.split(':')[0]);
        setSelected(exercise);
    }

    const optionsList = exercises.map((entry, i) => <option value={entry.name + ":" + entry._id} key={`exercise-${i}`}>{entry.name}</option>);

    return (
        <form className="prForm" method="post" onSubmit={handleSubmit}>
            <h2>Log Set</h2>
            <div className="form-group">
                <label>Date and Time</label>
                <input name="date_and_time" type="datetime-local" />
            </div>
            <div className="form-group">
                <label>Select an exercise: </label>
                <select value={selectedExercise.name} onChange={(e) => handleSelectedExercise(e)} name="selectedExercise">
                    <option>Choose an option</option>
                    {optionsList}
                </select>
            </div>
            <div className="form-group">
                <label>Weight in lbs: </label>
                <input name="set_weight" type="number" />
            </div>
            { selectedExercise && selectedExercise[0].balance === 'asymmetrical' ?
                <div className="form-group">
                    <label>Right Side Reps:
                <input name="right_reps" type="number" />
                    </label>
                    <label>Left Side Reps:
                <input name="left_reps" type="number" />
                    </label>
                </div>
                :
                <div className="form-group">
                    <label>Reps or Seconds held: </label>
                    <input name="total_reps" type="number" />
                </div>
            }
            <div className="action-container">
                <button className="btn-secondary" type="reset">Reset</button>
                <button className="btn-primary" type="save">Save</button>
            </div>
        </form>
    );
}


export default AddSet;