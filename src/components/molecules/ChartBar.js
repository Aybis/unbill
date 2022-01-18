import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function ChartBar({ title, dataChart, type }) {
  const data = {
    labels: dataChart.map((item) => item.alias),
    datasets: [
      {
        label: 'At Office',
        data: dataChart.map((item) => item.wfh),
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'At Home',
        data: dataChart.map((item) => item.wfo),
        backgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          borderWidth: 4,
        },
        ticks: {
          min: 0,
          // max: 1000,
          // stepSize: 200, // <----- This prop sets the stepSize
        },
      },
      x: {
        grid: {
          display: false,
          borderWidth: 4,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 24,
          font: {
            size: 12,
          },
          margin: {
            top: 20,
          },
        },
      },
      title: {
        padding: {
          bottom: 32,
          top: 12,
        },
        display: true,
        text: title,
        font: {
          size: 20,
        },
      },
    },
  };

  return <Bar options={options} data={data} />;
}
