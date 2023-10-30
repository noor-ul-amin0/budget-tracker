import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

interface LineChartProps {
  chartData: any;
  chartOptions?: any;
}

const LineChart: React.FC<LineChartProps> = ({ chartData, chartOptions }) => {
  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
