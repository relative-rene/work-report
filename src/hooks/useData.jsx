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
        setExercises(data);
    }

    const getSetsData = async (user_id) => {
        console.log('getSetsData')
        const res = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user_id}/read_sets`).catch(err => console.error(err));
        const data = await res.json();
        setSets(data);
    }

    const getStatsData = async (user_id) => {
        console.log('getStatsData')
        const res = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user_id}/read_stats`).catch(err => console.error(err))
        const data = await res.json()
        setStats(data);

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

