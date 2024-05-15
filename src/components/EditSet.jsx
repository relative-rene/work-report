import SetForm from '../components/forms/SetForm';
import { useParams } from 'react-router-dom';
import { useData } from '../hooks/useData';

const EditSet = () => {
    const { sets, exercises } = useData();
    const { set_id } = useParams();
    const selectedSet = sets.find(o => o._id === set_id);
    const exerciseDetails = exercises.find(exercise => exercise.name === selectedSet.exercise_name);
    return (<div>
        <SetForm
            title="Edit Set"
            isEditing={true}
            initData={
                {
                    ...selectedSet,
                    exerciseDetails,
                    selectedExercise: exerciseDetails.name + ':' + exerciseDetails._id
                }} />
    </div>)
}


export default EditSet