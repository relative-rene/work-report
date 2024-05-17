import SetForm from '../components/forms/SetForm';
import { INIT_SET } from '../data/constants';

const AddSet = () => {
    return (
        <>
            <SetForm
                title="Add Set"
                isEditing={false}
                initData={{ INIT_SET }} />
        </>);
}


export default AddSet