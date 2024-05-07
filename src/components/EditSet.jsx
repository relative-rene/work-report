import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import  ModalNavbar from '../components/ModalNavbar';
import { useData } from '../hooks/useData';

const EditSet = () => {
    const { set_id } = useParams();
    const [selectedExercise, setSelected] = useState([{ name: null, balance: null }]);
    const [isReady, setAvailability] = useState(true);
    const { user } = useAuth();
    const { sets, exercises } = useData();
    
    async function handleUpdateSet(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        setAvailability(false);
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/create_set`,
            { method: form.method, body: JSON.stringify(Object.fromEntries(formData.entries())), headers: { "Content-Type": "application/json" } });
        const data = response.json();
        data.message ? alert("Add Set Failed", data.message) : alert('Add Set Success')
        setAvailability(true);
    }

    async function handleSelectedExercise(val) {
        const exercise = exercises.filter(exercise => exercise.name === val.target.value.split(':')[0])[0];
        setSelected(exercise)
    }
    const optionsList = exercises.map((entry, i) => <option value={entry.name + ":" + entry._id} key={`exercise-${i}`}>{entry.name}</option>);
    const set = sets && sets.find(set => set._id === set_id);
    return (
        <>
            <form className="FormWR" method="post" onSubmit={handleUpdateSet}>
                <ModalNavbar />
                <h2 className="form-title">Edit Set</h2>
                <div className="form-group">
                    <label>Date</label>
                    <input defaultValue={set ? set.date_and_time.substring(0, 10) : ""} name="date_and_time" type="date" />
                </div>
                <div className="form-group">
                    <label>Select an exercise:</label>
                    {set &&
                        <select value={selectedExercise.name ? selectedExercise.name + ':' + selectedExercise._id : set.exercise_name + ':' + set.exercise_id} onChange={(e) => handleSelectedExercise(e)} name="selectedExercise">
                            <option>Choose an option</option>
                            {optionsList}
                        </select>
                    }
                </div>
                <div className="form-group">
                    <label>Weight in lbs: </label>
                    <input defaultValue={set ? set.set_weight : ''} name="set_weight" type="number" />
                </div>
                {set.right_reps ||( selectedExercise && selectedExercise.balance === 'asymmetrical') ?
                    <div className="form-group">
                        <label>Right Side Reps: </label>
                        <input defaultValue={set ? set.right_reps : ''} name="right_reps" type="number" />
                        <label>Left Side Reps: </label>
                        <input defaultValue={set ? set.left_reps : ''} name="left_reps" type="number" />
                    </div>
                    :
                    <div className="form-group">
                        <label>Reps or Seconds held: </label>
                        <input defaultValue={set ? set.total_reps : ''} name="total_reps" type="number" />
                    </div>
                }
                <div className="action-container">
                    <button className="action-container__btn--secondary" type="reset">Reset</button>
                    <button disabled={!isReady} className="action-container__btn--primary" type="save">Save</button>
                </div>
            </form>
        </>
    );
}


export default EditSet;