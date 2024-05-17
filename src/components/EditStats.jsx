import { useParams } from 'react-router-dom';
import StatsForm from '../components/forms/StatsForm';
import { useData } from '../hooks/useData';

function EditStats() {
    const { stat_id } = useParams();
    const { stats } = useData();
    const stat = stats.find((s) => s._id === stat_id);

    return (
        <section className="section-peak">
            <StatsForm
                title={"Edit Stat"}
                initData={stat}
                isEditing={true} />
        </section>);
}

export default EditStats;