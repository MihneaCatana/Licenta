import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

export default function PieChart(props) {

    ChartJS.register(ArcElement, Tooltip, Legend);


    const data = {
        labels: ['Finished', 'In Progress'],
        datasets: [
            {
                data: [props.data1.length, props.data2.length],
                backgroundColor: ['#3cb043', '#D0312D',],
            },
        ],
    };

    const options = {
        responsive: true,
    };

    return (
        <>
            <div>
                <Pie data={data} options={options}/>
            </div>
        </>
    )
}