import SetForm from '../components/forms/SetForm';
import { useParams } from 'react-router-dom';
import { useData } from '../hooks/useData';

const EditSet = () => {
    const { sets } = useData();
    const { set_id } = useParams();
    const selectedSet = sets.find(o => o._id === set_id);

    return (<div>
        <SetForm
            title="Edit Set"
            isEditing={true}
            initData={{ ...selectedSet}} />
    </div>)
}


export default EditSet