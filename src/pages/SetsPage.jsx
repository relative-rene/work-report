import React from 'react';
import { Link } from 'react-router-dom';
import AddSet from '../components/AddSet';
import { useData } from '../hooks/useData';

function SetsPage(){
    const {exercises, sets} = useData();
    const displayData = sets && sets.map(e => <li>{`${e.date_and_time.substring(0,10)}   `} <Link to={"/hub/sets/edit/" + e._id}>{e.exercise_name}</Link></li>)

    return (
        <>
            <h3>Sets Hub</h3>
            <div className="string-chart"></div>
            <AddSet exercises={exercises} />
            <div>
                <ul style={{"listStyle": "none"}}>{displayData}</ul>
            </div>
        </>
    )
}

export default SetsPage;