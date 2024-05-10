
import Table from '../components/UI/Table';
import AddSet from '../components/AddSet';
import { useData } from '../hooks/useData';

function SetsPage() {
    const { exercises, sets } = useData();
    // const displayData = sets && sets.map(e => <li>{`${e.date_and_time}   `} <Link to={"/hub/sets/edit/" + e._id}>{e.exercise_name}</Link></li>)

    return (
        <>
            <h3>Sets Hub</h3>
            <AddSet exercises={exercises} />
            <div className="table-container">
                <Table editPath="/hub/sets/edit/" tableData={sets} />
            </div>
        </>
    )
}

export default SetsPage;