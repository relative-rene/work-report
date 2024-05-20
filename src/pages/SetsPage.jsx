import { lazy } from 'react';
import { useData } from '../hooks/useData';
import { SETS_KEY_LABELS } from '../data/constants';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import AddSet from '../components/AddSet';

const Table = lazy(() => import('../components/UI/Table'));

function SetsPage() {
    const { exercises, sets } = useData();

    return (
        <>
        <section className="section-peak">
            <h3>Sets Hub</h3>
            <div className="table-container">
                {sets ? <Table tName="SetsTable" editPath="/hub/sets/edit/" tableData={sets} sortBy="date_and_time" keys={SETS_KEY_LABELS} /> : <LoadingSpinner />}
            </div> <br />
        </section>
            <AddSet exercises={exercises} />
        </>
    );
}

export default SetsPage;