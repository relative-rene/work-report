import React from 'react';

import AddSet from '../components/AddSet';
import { useData } from '../hooks/useData';
import { SETS_KEY_LABELS } from '../data/constants';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Table = React.lazy(() => import('../components/UI/Table'));

function SetsPage() {
    const { exercises, sets } = useData();
    return (
        <>
            <h3>Sets Hub</h3>
            <div className="table-container">
                {sets ? <Table editPath="/hub/sets/edit/" tableData={sets} sortBy="date_and_time" keys={SETS_KEY_LABELS} /> : <LoadingSpinner />}
            </div> <br />
            <AddSet exercises={exercises} />
        </>
    )
}

export default SetsPage;