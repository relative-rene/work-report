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
    const [todos, setTodos] = useState([]);

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
            const formattedSets = data.map(({ _id, date_and_time, exercise_name, set_weight, total_reps, left_reps, right_reps }) => ({ _id, date_and_time: date_and_time ? formatTimeStampToUS(date_and_time) : "", exercise_name, set_weight, total_reps, left_reps, right_reps }));
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
            }));
            setStats(formattedStats);
        } catch (err) {
            console.error(err);
        }
    }

    const getTodoData = async (user_id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user_id}/todos/read_todos`)
            const data = await res.json();
            let sortByDueDate = data.sort((a, b) => new Date(a.due_date_and_time) - new Date(b.due_date_and_time));
            let sortedByDone = sortByDueDate.sort((a, b) => a.is_done - b.is_done);
            setTodos(sortedByDone);
        } catch (err) {
            console.error(err);
        }
    }

    const updateExercises = () => getExerciseData(user._id);
    const updateStats = () => getStatsData(user._id);
    const updateSets = () => getSetsData(user._id);
    const updateTodos = () => getTodoData(user._id);

    const loadData = async (user_id) => {
        await getExerciseData();
        if (user_id) {
            getStatsData(user_id);
            getSetsData(user_id);
            getTodoData(user_id);
        }
    }

    const value = useMemo(
        () => ({
            exercises,
            sets,
            stats,
            todos,
            updateExercises,
            updateStats,
            updateSets,
            updateTodos,
            loadData
        }), [
        exercises,
        sets,
        stats,
        todos,
        loadData]
    );

    return <DataContext.Provider value={value}> {children} </DataContext.Provider>
}

