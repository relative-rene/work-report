import React, { useEffect, useState } from 'react';
import AddStats from '../components/AddStats';
import { useAuth } from '../hooks/useAuth';
import {getStatData} from '../services/stat.service';
import { useData } from '../hooks/useData';
const StatsPage = () => {
    const { stats } = useData();
    
    useEffect(()=>{
        console.log('stats', stats);
    },[stats])
    return (
        <>
            <AddStats />
        </>
    );
}
export default StatsPage;