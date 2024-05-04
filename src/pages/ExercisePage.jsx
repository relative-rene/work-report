import React, {useEffect, useState} from 'react';
import AddExercise from '../components/AddExercise';


const ExercisePage = () => {
    let [exercises, setExercises] = useState([]);
    const displayExercises = exercises && exercises.map(e => <li>{e.name + '\n' + e.muscle_group + '\n' + e.balance + '\n' + e.primary_muscle}</li>);

    return (
        <>
            <AddExercise />
            <ul>{displayExercises}</ul>
        </>
    )
}

export default ExercisePage;