import { lazy } from 'react';
import { useData } from '../hooks/useData';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import AddStats from '../components/AddStats';
import { STATS_KEY_LABELS } from '../data/constants';
const Table = lazy(() => import('../components/UI/Table'));
const StatsPage = () => {
    const { stats } = useData();
    
    return (
        <>
        <section className="section-peak">
            <h3>Stats Hub</h3>
            <div className="table-container">
                {stats ? <Table editPath="/hub/stats/edit/" tableData={stats} keys={STATS_KEY_LABELS} sortBy="date" /> : <LoadingSpinner />}
            </div><br />
        </section>
        
            <AddStats />
        </>
    );
}
export default StatsPage;