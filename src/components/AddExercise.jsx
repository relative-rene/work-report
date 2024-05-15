import ExerciseForm from '../components/forms/ExerciseForm';

export const AddExercise = () => {

    return (<div>
        <ExerciseForm 
            title="Add Exercise" 
            isEditing={false} 
            initData={ {name: "", muscle_group: "", primary_muscle: "", balance: "" }} />
    </div>)
}


export default AddExercise;