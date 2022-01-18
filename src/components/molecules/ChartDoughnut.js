import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { capitalize } from '../../helpers/Assets';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartDoughnut({ dataChart, title, type }) {
  const options = {
    mainAspectRatio: false,
    cutout: '80%',
    responsive: true,
    borderRadius: 30,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 14,
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

  const data = {
    labels: dataChart.map((item) => capitalize(item.name)),
    datasets: [
      {
        label: '# of Votes',
        data: dataChart.map((item) => item.value),
        backgroundColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86,1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 p-4 bg-slate-50 rounded-md shadow-md shadow-slate-200/50 mt-4">
        {dataChart.map((item) => (
          <div key={Math.random()} className="flex gap-2">
            <span className="text-zinc-500 font-medium capitalize">
              {item.name}
            </span>{' '}
            :{' '}
            <span className="text-zinc-800 font-semibold">
              {' '}
              {item.value} <small className="font-normal">{type}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
