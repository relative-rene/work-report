import React, { useEffect } from 'react';
import AddStats from '../components/AddStats';
import { useData } from '../hooks/useData';
import Table from '../components/UI/Table';

const StatsPage = () => {
    const { stats } = useData();
    
    useEffect(()=>{
    },[stats])
    return (
        <>
        <h3>Stats Hub</h3>
        <div className="table-container">
                <Table editPath="/hub/stats/edit/" tableData={stats} />
        </div>
            <AddStats />
        </>
    );
}
export default StatsPage;