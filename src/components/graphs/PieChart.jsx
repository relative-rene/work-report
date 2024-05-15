import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
    responsive: true
}
function PieChart({ data }) {
    return (<div>
                <Pie data={data} options={options} />
            </div>);
}

export default PieChart;