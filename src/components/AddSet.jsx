import SetForm from '../components/forms/SetForm';

const AddSet = () => {

    return (<div>
        <SetForm
            title="Add Set"
            isEditing={false}
            initData={{ selectedExercise: "", total_reps: "", right_reps: "", left_reps: "", set_weight: "" }} />
    </div>)
}


export default AddSet