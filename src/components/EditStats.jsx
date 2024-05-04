import React, { useParams } from 'react';
import StatsForm from '../components/forms/StatsForm';

function EditStats({ data }) {
    const { stats_id } = useParams();
    const stat = data.find((s) => s._id === stats_id);
    console.log('stat', stat);

    return (<div>
        <StatsForm title={"Edit Stat"} data={stat} />
    </div>)
}

export default EditStats;