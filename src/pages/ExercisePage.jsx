import { lazy } from 'react';
import AddExercise from '../components/AddExercise';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { EXERCISE_KEY_LABELS } from '../data/constants';
import { useData } from '../hooks/useData';

const Table = lazy(() => import('../components/UI/Table'));

const ExercisePage = () => {
    let { exercises } = useData();

    return (
        <>
            <section className="section-peak">
                <h3>Exercise Hub</h3>
                <div className="table-container">
                    {exercises ? <Table editPath="/hub/exercises/edit/" tableData={exercises} keys={EXERCISE_KEY_LABELS} /> : <LoadingSpinner />}
                </div><br />
            </section>
            <AddExercise />
        </>
    );
}

export default ExercisePage;