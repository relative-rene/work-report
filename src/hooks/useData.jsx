// use-auth.js

import { createContext, useContext, useState, useMemo } from 'react';
import { useAuth } from './useAuth';

// Create a context for data
const DataContext = createContext();

// Custom hook to provide data access functionality
export const useData = () => {
    return useContext(DataContext);
}

// DataProvider wraps your entire app to provide authentication context
export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [exercises, setExercises] = useState([]);
    const [sets, setSets] = useState([]);
    const [stats, setStats] = useState([]);

    // Other authentication-related functions (login, logout, etc.) go here

    const getExerciseData = async () => {
        console.log('getExerciseData')
        const res = await fetch(`${process.env.REACT_APP_SERVER}/api/gains/exercises`).catch(err => console.error(err))
        const data = await res.json();
        const formattedExercises = data.map(({ _id, name, balance, muscle_group, primary_muscle }) => ({ _id, name, balance, muscle_group, primary_muscle }));

        setExercises(formattedExercises);
    }

    const getSetsData = async (user_id) => {
        console.log('getSetsData')
        const res = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user_id}/read_sets`).catch(err => console.error(err));
        const data = await res.json();
        const formattedSets = data.map(({ _id, date_and_time, exercise_name, set_weight, total_reps, left_reps, right_reps }) => ({ _id, date_and_time:  date_and_time.substring(0, 10)|| date_and_time, exercise_name, set_weight, total_reps, left_reps, right_reps }));

        setSets(formattedSets);
    }

    const getStatsData = async (user_id) => {
        console.log('getStatsData')
        const res = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user_id}/read_stats`).catch(err => console.error(err))
        const data = await res.json()
        const formattedStats = data.map(({ _id, date, age, weight, body_fat, height, neck, chest, belly, butt, left_arm, right_arm, left_forearm, right_forearm, left_leg, right_leg }) => ({
            _id, date, age, weight, body_fat, height, neck, chest, belly, butt, left_arm, right_arm, left_forearm, right_forearm, left_leg, right_leg
        }));
        setStats(formattedStats);
    }

    const loadData = async (user_id) => {
        await getExerciseData();
        if (user_id) {
            getStatsData(user_id);
            getSetsData(user_id);
        }
    }

    const value = useMemo(
        () => ({
            exercises,
            sets,
            stats,
            loadData
        }), [
        exercises,
        sets,
        stats]
    );

    return <DataContext.Provider value={value}> {children} </DataContext.Provider>
}

