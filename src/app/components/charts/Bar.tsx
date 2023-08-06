import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { KeyValuePair } from '@/app/utils/charts';
import { ColorUtil } from '@/app/utils/colors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface BarChartProps {
  data: KeyValuePair[],
  title?: string,
  legend?: boolean,
  label: string
}

export default function BarChart({ data, title, legend = true, label = "Count" }: BarChartProps) {

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: legend
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  };

  return <Bar options={options} data={chartData} />;
}
