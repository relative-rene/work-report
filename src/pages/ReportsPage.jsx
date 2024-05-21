import PieChart from '../components/graphs/PieChart';
import BarChart from '../components/graphs/BarChart';
import LineChart from '../components/graphs/LineChart';
import { useData } from '../hooks/useData';
import { groupByKey, pieChartConfig } from '../utility/transformers';
import { MUSCLE_GROUP_LABELS, PIE_DATA_LABEL, BORDERCOLOR_CONFIG, BGCOLOR_CONFIG } from '../data/constants';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { addWorkLoad } from '../utility/transformers';

const ReportsPage = () => {
    const { exercises, sets } = useData();
    const groupedByExerciseName = groupByKey(sets, 'exercise_name');
    const groupedByDate = groupByKey(sets, 'date_and_time');

    const dictionary = exercises.reduce((acc, curr) => {
        if (!(curr['name'] in acc)) {
            acc[curr['name']] = curr['muscle_group'];
        }
        return acc;
    }, {});

    let musclesWorkedData = MUSCLE_GROUP_LABELS.reduce((acc, curr) => {
        acc[curr.toLowerCase()] = 0;
        return acc;
    }, {})

    Object.keys(groupedByExerciseName).forEach(exercise_name => musclesWorkedData[dictionary[exercise_name]] += +groupedByExerciseName[exercise_name].length);
    const chartData = pieChartConfig(MUSCLE_GROUP_LABELS, BGCOLOR_CONFIG, BORDERCOLOR_CONFIG, PIE_DATA_LABEL, Object.values(musclesWorkedData));
    // console.log(groupedByDate, groupedByExerciseName, sets);
    const muscleWork = sets.reduce((acc, curr)=>{
        if(!(curr["exercise_name"] in acc)){
            acc[curr['exercise_name']][curr['date_and_time']]=0;
        };
        acc[curr['exercise_name']][curr['date_and_time']] += addWorkLoad(curr);

        return acc;
    },{});
    console.log('muscleWork', muscleWork);
    return (
        <>
            <h3>Reports Hub</h3>
            {sets ?
                <>
                    <LineChart data={chartData} />

                    <PieChart data={chartData} />

                    <BarChart data={chartData} chartTitle="Muscle Group Bar Chart" />
                </> : <LoadingSpinner hasBlur={true} />}
        </>
    )
}

export default ReportsPage;