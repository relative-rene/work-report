import React, { Suspense } from 'react';
import { useData } from '../hooks/useData';
import Table from '../components/UI/Table';
import LineChart from '../components/graphs/LineChart';

const ReportsPage = () => {
    const { exercises, sets, stats } = useData();
    return (
        <>
            <h3>Reports Hub</h3>
            <Suspense fallback={<h2>...Loading</h2>}>
                <LineChart />
            </Suspense>
            <div className="table-container">
                <Table tableData={exercises} />
            </div>
            <Suspense fallback={<h2>...Loading</h2>}>
                <LineChart />
            </Suspense>
            <div className="table-container">
                <Table tableData={sets} />
            </div>
            <Suspense fallback={<h2>...Loading</h2>}>
                <LineChart />
            </Suspense>
            <div className="table-container">
                <Table tableData={stats} />
            </div>
        </>
    )
}

export default ReportsPage;