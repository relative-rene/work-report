import React, { useEffect } from 'react';
import AddStats from '../components/AddStats';
import { useData } from '../hooks/useData';

const StatsPage = () => {
    const { stats } = useData();
    
    useEffect(()=>{
        console.log('stats', stats);
    },[stats])
    return (
        <>
        <h3>Stats Hub</h3>
            <AddStats />
        </>
    );
}
export default StatsPage;