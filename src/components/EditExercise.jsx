import { useParams } from 'react-router-dom';
import { useData } from '../hooks/useData';
import ExerciseForm from '../components/forms/ExerciseForm';

const EditExercise = () => {
    const { exercise_id } = useParams();
    const { exercises } = useData();
    const selectedExercise = exercises.find(exercise => exercise._id === exercise_id);

    return (<div>
        <ExerciseForm 
            title="Edit Exercise" 
            isEditing={true} 
            initData={selectedExercise} />
    </div>)
}


export default EditExercise