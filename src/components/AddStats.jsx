import StatsForm from '../components/forms/StatsForm';
import { INIT_STATS } from '../data/constants';

function AddStats() {

    return (<div>
        <StatsForm 
            title={"Add Stat"} 
            initData={INIT_STATS}
            isEditing={false} />
    </div>)
}

export default AddStats;