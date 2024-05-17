import { lazy } from 'react';
import AddExercise from '../components/AddExercise';
import { useData } from '../hooks/useData';
import { EXERCISE_KEY_LABELS } from '../data/constants';

const Table = lazy(() => import('../components/UI/Table'));
const ExercisePage = () => {
    let { exercises } = useData();

    return (
        <>
            <h3>Exercise Hub</h3>
            <div className="table-container">
                <Table editPath="/hub/exercises/edit/" tableData={exercises} keys={EXERCISE_KEY_LABELS} />
            </div><br />
            <AddExercise />
        </>
    )
}

export default ExercisePage;