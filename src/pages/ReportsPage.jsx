import PieChart from '../components/graphs/PieChart';
import BarChart from '../components/graphs/BarChart';
import LineChart from '../components/graphs/LineChart';
import { addWorkLoad, filterByMonths } from '../utility/transformers';
import { groupByKey, buildChartData } from '../utility/transformers';
import { MUSCLE_GROUP_LABELS, PIE_DATA_LABEL, BORDERCOLOR_CONFIG, BGCOLOR_CONFIG } from '../data/constants';
import { useData } from '../hooks/useData';
import { useMemo, useState } from 'react';

const ReportsPage = () => {
    const { exercises, sets } = useData();
    const [chartType, setChart] = useState('line')// ['line', 'bar', 'pie']
    const groupedByExerciseName = useMemo(() => groupByKey(sets, 'exercise_name'), [sets]);

    const dictionary = useMemo(() => {
        return exercises.reduce((acc, curr) => {
            if (!(curr['name'] in acc)) acc[curr['name']] = curr['muscle_group'];
            return acc;
        }, {});
    }, [exercises]);

    const musclesWorkedData = useMemo(() => {
        return MUSCLE_GROUP_LABELS.reduce((acc, curr) => {
            acc[curr.toLowerCase()] = 0;
            return acc;
        }, {});
    }, []);

    Object.keys(groupedByExerciseName).forEach(exercise_name => musclesWorkedData[dictionary[exercise_name]] += +groupedByExerciseName[exercise_name].length);

    const chartData = buildChartData(MUSCLE_GROUP_LABELS, BGCOLOR_CONFIG, BORDERCOLOR_CONFIG, PIE_DATA_LABEL, Object.values(musclesWorkedData));
    const exerciseWork = useMemo(() => {
        return sets.reduce((acc, curr) => {
            if (!(curr['exercise_name'] in acc)) acc[curr['exercise_name']] = {}
            if (!(curr['date_and_time'] in acc[curr['exercise_name']])) acc[curr['exercise_name']][curr['date_and_time']] = 0;
            acc[curr['exercise_name']][curr['date_and_time']] += addWorkLoad(curr);
            return acc;
        }, {});
    }, [sets]);

    const exerciseWeight = useMemo(() => {
        return sets.reduce((acc, curr) => {
            if (!(curr['exercise_name'] in acc)) acc[curr['exercise_name']] = 0;
            if (acc[curr['exercise_name']] < curr.set_weight) acc[curr['exercise_name']] = curr.set_weight;
            return acc;
        }, {});
    }, [sets]);

    const exercise_weight = Object.entries(exerciseWeight)
        .map(([key, val], i) => {
            return <li className="exercise-weight" key={`${val}-${i}`}><b>{key}</b><span>{`${val}`}</span></li>
        });

    const exerciseWorkData = Object.keys(exerciseWork).map((key, i) => {
        return buildChartData(Object.keys(exerciseWork[key]), BGCOLOR_CONFIG, BORDERCOLOR_CONFIG, key, Object.values(exerciseWork[key]));
    });

    const lineCharts = exerciseWorkData.map(e => <LineChart data={e} />).concat(<LineChart data={chartData} />);
    const barCharts = exerciseWorkData.map(e => <BarChart data={e} />).concat(<BarChart data={chartData} />);
    const pieCharts = exerciseWorkData.map(e => <PieChart data={e} />).concat(<PieChart data={chartData} />);
    const repRangeData = useMemo(() => {
        return Object.keys(groupedByExerciseName).map((key) => {
            return groupedByExerciseName[key].reduce((acc, curr) => {
                if (!(curr.exercise_name in acc)) acc[curr.exercise_name] = { low: 0, mid: 0, high: 0 }
                if (curr.total_reps && curr.total_reps <= 5) acc[curr.exercise_name].low++;
                if (curr.total_reps && curr.total_reps > 5 && curr.total_reps <= 12) acc[curr.exercise_name].mid++;
                if (curr.total_reps && curr.total_reps > 12) acc[curr.exercise_name].high++;

                if (curr.right_reps && curr.right_reps <= 5) acc[curr.exercise_name].low++;
                if (curr.right_reps && curr.right_reps > 5 && curr.right_reps <= 12) acc[curr.exercise_name].mid++;
                if (curr.right_reps && curr.right_reps > 12) acc[curr.exercise_name].high++;

                if (curr.left_reps && curr.left_reps <= 5) acc[curr.exercise_name].low++;
                if (curr.left_reps && curr.left_reps > 5 && curr.left_reps <= 12) acc[curr.exercise_name].mid++;
                if (curr.left_reps && curr.left_reps > 12) acc[curr.exercise_name].high++;
                return acc;
            }, {})
        }).reduce((acc, curr) => {
            const [exerciseName] = Object.keys(curr);
            acc[exerciseName] = curr[exerciseName];
            return acc;
        }, {});
    }, [groupedByExerciseName]);

    const rep_ranges = Object.entries(repRangeData)
        .map(([key, val], i) => {
            return <div className="rep-ranges" key={`${val}-${i}`}><b>{key}</b>
                <p><span>{val.low} </span> <span>{val.mid}</span> <span>{val.high}</span></p>
            </div>
        });

    rep_ranges.unshift(<div key="range-lables" className="rep-ranges"><b></b> <p><span>low</span>    <span>mid</span>   <span>high</span></p></div>);

    const setsWithinAMonth = filterByMonths(1, sets);

    const recommendWeightIncrease = useMemo(() => {
        return setsWithinAMonth.reduce((acc, curr) => {
            if (!(curr.exercise_name in acc)) acc[curr.exercise_name] = { low: 0, mid: 0, high: 0 };
            if (curr.total_reps && curr.total_reps < 5) acc[curr.exercise_name].low++;
            if (curr.total_reps && curr.total_reps >= 5 && curr.total_reps <= 12) acc[curr.exercise_name].mid++;
            if (curr.total_reps && curr.total_reps > 12) acc[curr.exercise_name].high++;

            if (curr.right_reps && curr.right_reps < 5) acc[curr.exercise_name].low++;
            if (curr.right_reps && curr.right_reps >= 5 && curr.right_reps <= 12) acc[curr.exercise_name].mid++;
            if (curr.right_reps && curr.right_reps > 12) acc[curr.exercise_name].high++;

            if (curr.left_reps && curr.left_reps < 5) acc[curr.exercise_name].low++;
            if (curr.left_reps && curr.left_reps >= 5 && curr.left_reps <= 12) acc[curr.exercise_name].mid++;
            if (curr.left_reps && curr.left_reps > 12) acc[curr.exercise_name].high++;
            return acc;
        }, {});
    }, [setsWithinAMonth]);

    const recommendation = Object.keys(recommendWeightIncrease).map((curr) => {
        let vm = recommendWeightIncrease[curr];
        if (vm.high >= 1 && vm.mid >= 2) {
            return `${curr}: is highly recommended to increase weight`;
        } else if ((vm.mid + vm.high) > 3) {
            return `${curr}: consider increasing weight`;
        } else if (vm.mid < vm.low - 3) {
            return `${curr}: consider lowering weight`;
        }
        return false;
    }).filter(e => e);

    const recommendationDisplay = useMemo(() => recommendation.map((curr, i) => <li key={`${curr}-${i}`}>{curr}</li>), [recommendation]);
    const displayChart = useMemo(()=>{
        if(chartType === 'line') return lineCharts;
        if(chartType === 'bar') return barCharts;
        if(chartType === 'pie') return pieCharts;
    },[chartType]);
    return (
        <>
            <h1 className="wr-title">Reports Hub</h1>
            <div className="reports-page-content">
                <div>
                    <h3>Weight Recommendations</h3>
                    <ul>{recommendationDisplay}</ul>
                </div>
                <div>
                    <h3> Rep Range</h3>
                    <ul className="rep-ranges-container">
                        {rep_ranges}
                    </ul>
                </div>
                <div>
                    <h3> Exercise Weight</h3>
                    <ul className="exercise-weight-container">
                        {exercise_weight}
                    </ul>
                </div>
                <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'flex-start'}}>
                    <button onClick={()=>setChart('line')}>Line Chart</button>
                    <button onClick={()=>setChart('bar')}>Bar Chart</button>
                    <button onClick={()=>setChart('pie')}>Pie Chart</button>
                </div>
                {displayChart}

            </div>
        </>

    )
}

export default ReportsPage;