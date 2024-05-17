import { lazy, useEffect } from 'react';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import AddStats from '../components/AddStats';
import { STATS_KEY_LABELS } from '../data/constants';

const Table = lazy(() => import('../components/UI/Table'));
const StatsPage = () => {
    const { stats, loadData } = useData();
    const { reloadUser } = useAuth();
    useEffect(() => {
        if (!stats) {
            reloadUser()
                .then(user => loadData(user._id))
                .catch(err => console.error(err));
        }
    }, [stats])
    return (
        <>
            <h3>Stats Hub</h3>
            <div className="table-container">
                {stats ? <Table editPath="/hub/stats/edit/" tableData={stats} keys={STATS_KEY_LABELS} sortBy="date" /> : <LoadingSpinner />}
            </div><br />
            <AddStats />
        </>
    );
}
export default StatsPage;