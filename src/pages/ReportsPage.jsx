import PieChart from '../components/graphs/PieChart';
import BarChart from '../components/graphs/BarChart';
import LineChart from '../components/graphs/LineChart';
import { useData } from '../hooks/useData';
import { groupByKey, pieChartConfig } from '../utility/transformers';
import { MUSCLE_GROUP_LABELS, PIE_DATA_LABEL, BORDERCOLOR_CONFIG, BGCOLOR_CONFIG } from '../data/constants';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ReportsPage = () => {
    const { exercises, sets } = useData();
    const formattedSets = groupByKey(sets, 'exercise_name');
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

    Object.keys(formattedSets).forEach(exercise_name => musclesWorkedData[dictionary[exercise_name]] += +formattedSets[exercise_name].length);

    const chartData = pieChartConfig(MUSCLE_GROUP_LABELS, BGCOLOR_CONFIG, BORDERCOLOR_CONFIG, PIE_DATA_LABEL, Object.values(musclesWorkedData));

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