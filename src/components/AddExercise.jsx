import ExerciseForm from '../components/forms/ExerciseForm';
import { INIT_EXERCISE } from '../data/constants';
export const AddExercise = () => {

    return (
        <>
            <ExerciseForm
                title="Add Exercise"
                isEditing={false}
                initData={INIT_EXERCISE} />
        </>);
}


export default AddExercise;