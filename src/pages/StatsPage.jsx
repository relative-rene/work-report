import { useData } from '../hooks/useData';
import AddStats from '../components/AddStats';
import Table from '../components/UI/Table';
import { STATS_KEY_LABELS } from '../data/constants';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const StatsPage = () => {
    const { stats } = useData();

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