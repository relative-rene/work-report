import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const lineChartData = {
    labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    datasets: [
        {
            label: "Steps",
            data: [1223, 23, 43123, 4456, 4233, 75],
            borderColor: 'rgba(53, 162, 235, 0.5)',
        }
    ]
}
const options = {
    responsive: true
}
const LineChart = ({ data }) => {
    return (<div>
        <Line data={data} options={options} />
    </div>);
}


export default LineChart;