import StatsForm from '../components/forms/StatsForm';
import { INIT_STATS } from '../data/constants';

function AddStats() {

    return (
        <>
            <StatsForm
                title={"Add Stat"}
                initData={INIT_STATS}
                isEditing={false} />
        </>);
}

export default AddStats;