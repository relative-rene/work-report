
import Table from '../components/UI/Table';
import AddSet from '../components/AddSet';
import { useData } from '../hooks/useData';

function SetsPage() {
    const { exercises, sets } = useData();

    return (
        <>
            <h3>Sets Hub</h3>
            <div className="table-container">
                <Table editPath="/hub/sets/edit/" tableData={sets} />
            </div> <br/>
            <AddSet exercises={exercises} />
        </>
    )
}

export default SetsPage;