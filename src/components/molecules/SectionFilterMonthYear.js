import React from 'react';

export default function SectionFilterMonthYear({ month, year, handlerChange }) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'All',
  ];

  return (
    <div className="relative grid grid-cols-2 w-lg gap-4 mt-6">
      <select
        value={month}
        name="month"
        onChange={(event) => handlerChange(event)}
        className="px-4 py-2 rounded bg-white border-2 pr-8 border-transparent focus:border-blue-500">
        {months.map((item, index) => (
          <option
            key={Math.random()}
            value={item === 'All' ? 'all' : index + 1}>
            {item}
          </option>
        ))}
      </select>
      <select
        name="year"
        onChange={(event) => handlerChange(event)}
        value={year}
        className="px-4 py-2 rounded bg-white border-2 pr-8 border-transparent focus:border-blue-500">
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
      </select>
    </div>
  );
}
