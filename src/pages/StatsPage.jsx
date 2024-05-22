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
            <h1 className="wr-title">Stats Hub</h1>
            <div className="table-container">
                {stats ? <Table tName="StatsTable" editPath="/hub/stats/edit/" tableData={stats} keys={STATS_KEY_LABELS} sortBy="date" /> : <LoadingSpinner />}
            </div><br />
        </section>
        
            <AddStats />
        </>
    );
}
export default StatsPage;