import React, { useEffect, useState } from 'react';
import AddExercise from './AddExercise';

const ExerciseList = () => {
    let [exercises, setExercises] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/gains/exercises");
                const newData = await response.json();
                setExercises(newData);
            } catch (error) {
                console.error(`Error fetching data:`, error);
            }
        }
        fetchData();
    }, []);

    const displayExercises = exercises && exercises.map(e => <li>{e.name + '\n' + e.movements}</li>);

    return (
        <div>
            <AddExercise />
            <ul>{displayExercises}</ul>
        </div>
    );
}


export default ExerciseList;