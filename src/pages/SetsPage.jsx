import { lazy, useEffect } from 'react';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import { SETS_KEY_LABELS } from '../data/constants';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import AddSet from '../components/AddSet';

const Table = lazy(() => import('../components/UI/Table'));

function SetsPage() {
    const { exercises, sets, loadData } = useData();
    const { reloadUser } = useAuth();
    useEffect(() => {
        if (!sets) {
            reloadUser()
                .then(user => loadData(user._id))
                .catch(err => console.error(err));
        }
    }, [sets])
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