import { createContext, useContext, useState, useMemo } from 'react';
import { useAuth } from './useAuth';
import { formatTimeStampToUS } from '../utility/transformers';

// Create context for data
const DataContext = createContext();

// Custom hook to distribute access to data
export const useData = () => {
    return useContext(DataContext);
}

// DataProvider wraps your entire app to provide data context
export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [exercises, setExercises] = useState([]);
    const [sets, setSets] = useState([]);
    const [stats, setStats] = useState([]);

    const getExerciseData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/gains/exercises`);
            const data = await res.json();
            const formattedExercises = data.map(({ _id, name, balance, muscle_group, primary_muscle }) => ({ _id, name, balance, muscle_group, primary_muscle }));
            setExercises(formattedExercises);
        } catch (err) {
            console.error(err);
        }
    }

    const getSetsData = async (user_id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user_id}/read_sets`);
            const data = await res.json();
            const formattedSets = data.map(({ _id, date_and_time, exercise_name, set_weight, total_reps, left_reps, right_reps }) => ({ _id, date_and_time: date_and_time ? formatTimeStampToUS(date_and_time) : "", exercise_name, set_weight, total_reps, left_reps, right_reps })).sort((a, b) => new Date(a.date_and_time) - new Date(b.date_and_time));
            setSets(formattedSets);
        } catch (err) {
            console.error(err);
        }
    }

    const getStatsData = async (user_id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user_id}/read_stats`);
            const data = await res.json()
            const formattedStats = data.map(({ _id, date, age, weight, body_fat, height, neck, chest, belly, butt, left_arm, right_arm, left_forearm, right_forearm, left_leg, right_leg }) => ({
                _id, date: formatTimeStampToUS(date), age, weight, body_fat, height, neck, chest, belly, butt, left_arm, right_arm, left_forearm, right_forearm, left_leg, right_leg
            })).sort((a, b) => new Date(a.date) - new Date(b.date));
            setStats(formattedStats);
        } catch (err) {
            console.error(err);
        }
    }

    const updateExercises = () => getExerciseData(user._id);
    const updateStats = () => getStatsData(user._id);
    const updateSets = () => getSetsData(user._id);

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
            updateExercises,
            updateStats,
            updateSets,
            loadData
        }), [
        exercises,
        sets,
        stats,
        user,
        loadData]
    );

    return <DataContext.Provider value={value}> {children} </DataContext.Provider>
}

