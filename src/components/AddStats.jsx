import { useParams } from 'react-router-dom';
import StatsForm from '../components/forms/StatsForm';
import { useData } from '../hooks/useData';
import { INIT_STATS } from '../data/constants';

function AddStats() {
    const { stat_id } = useParams();
    const { stats } = useData();

    return (<div>
        <StatsForm 
            title={"Add Stat"} 
            initData={INIT_STATS}
            isEditing={true} />
    </div>)
}

export default AddStats;