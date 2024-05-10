import SetForm from '../components/forms/SetForm';

const AddSet = () => {

    return (<div>
        <SetForm
            title="Add Set"
            isEditing={false}
            initData={[{ selectedExercise: null, total_reps: null, right_reps: null, left_reps: null, set_weight: null }]} />
    </div>)
}


export default AddSet