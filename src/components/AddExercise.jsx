import ExerciseForm from '../components/forms/ExerciseForm';

export const AddExercise = () => {

    return (<div>
        <ExerciseForm 
            title="Add Exercise" 
            isEditing={false} 
            initData={ {name: null, muscle_group: null, primary_muscle: null, balance: null }} />
    </div>)
}


export default AddExercise;