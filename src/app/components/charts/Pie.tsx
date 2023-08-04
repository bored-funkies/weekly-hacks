import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import { ColorUtil } from '@/app/utils/colors';
import { KeyValuePair } from '@/app/utils/charts';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export interface PieChartProps {
  data: KeyValuePair[],
  label: string
}

export default function PieChart({ data, label = "Count" }: PieChartProps) {

  const labels: string[] = [], values: number[] = [], colors: string[] = [];
  
  data.forEach(d => {
    labels.push(d.key);
    values.push(d.value);
    colors.push(ColorUtil.getColor(d.key));
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: label,
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  return <Pie style={{ height: "100%", width: "100%" }} data={chartData} />
}
