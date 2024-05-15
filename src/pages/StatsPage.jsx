import { useData } from '../hooks/useData';
import AddStats from '../components/AddStats';
import Table from '../components/UI/Table';
import { STATS_KEY_LABELS } from '../data/constants';

const StatsPage = () => {
    const { stats } = useData();

    return (
        <>
            <h3>Stats Hub</h3>
            <div className="table-container">
                <Table editPath="/hub/stats/edit/" tableData={stats} keys={STATS_KEY_LABELS} sortBy="date"/>
            </div><br />
            <AddStats />
        </>
    );
}
export default StatsPage;