import { useData } from '../hooks/useData';
import AddStats from '../components/AddStats';
import Table from '../components/UI/Table';

const StatsPage = () => {
    const { stats } = useData();

    return (
        <>
            <h3>Stats Hub</h3>
            <div className="table-container">
                <Table editPath="/hub/stats/edit/" tableData={stats} />
            </div><br/>
            <AddStats />
        </>
    );
}
export default StatsPage;