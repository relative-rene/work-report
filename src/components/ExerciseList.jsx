import React, { useEffect, useState } from 'react';
import AddExercise from './AddExercise';

const ExerciseList = () => {
    let [exercises, setExercises] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('fetchData', process.env.REACT_APP_SERVER);
                const response = await fetch(`${process.env.REACT_APP_SERVER}/api/gains/exercises`);
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
        <>
            <AddExercise />
            <ul>{displayExercises}</ul>
        </>
    );
}


export default ExerciseList;