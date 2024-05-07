import React from 'react';
import { useData } from '../hooks/useData';
import Table from '../components/UI/Table';

const ReportsPage = () => {
    const { exercises, sets, stats } = useData();
    return (
        <>
        <h3>Reports Hub</h3>
            <Table tableData={exercises} />
            <Table tableData={sets} />
            <Table tableData={stats} />
        </>
    )
}

export default ReportsPage;