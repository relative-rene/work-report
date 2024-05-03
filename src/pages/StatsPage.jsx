import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AddStats from '../components/AddStats';


const StatsPage = () => {
    const { allSets } = useOutletContext();
    // const groupedData = groupByKey(setsData,  "exercise_name");
    const displayData = allSets.map(e => <li>{e.date_and_time.substring(0, 10)}:
                            <Link to={"/work-report/hub/sets/edit/" + e._id}>{e.exercise_name}</Link></li>)

    return (
        <>
            <div className="className">Recent PRs</div>
            <div className="className">Progressive Overload</div>
            <div className="string-chart"></div>
            <AddStats />
            <div>
                <ul style={{ "listStyle": "none" }}>{displayData}</ul>
            </div>
        </>
    );
}
    export default StatsPage;