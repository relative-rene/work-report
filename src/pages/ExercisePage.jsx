import AddExercise from '../components/AddExercise';
import { useData } from '../hooks/useData';
import  Table  from '../components/UI/Table';

const ExercisePage = () => {
    let { exercises } = useData();

    return (
        <>
            <h3>Exercise Hub</h3>
            <div className="table-container">
                <Table editPath="/hub/exercises/edit/" tableData={exercises} />
            </div><br/>
            <AddExercise />
        </>
    )
}

export default ExercisePage;