
import Table from '../components/UI/Table';
import AddSet from '../components/AddSet';
import { useData } from '../hooks/useData';
import { SETS_KEY_LABELS } from '../data/constants';
function SetsPage() {
    const { exercises, sets } = useData();
    return (
        <>
            <h3>Sets Hub</h3>
            <div className="table-container">
                <Table editPath="/hub/sets/edit/" tableData={sets} sortBy="date_and_time" keys={SETS_KEY_LABELS} />
            </div> <br/>
            <AddSet exercises={exercises} />
        </>
    )
}

export default SetsPage;