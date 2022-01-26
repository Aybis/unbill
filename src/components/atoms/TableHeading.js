import React from 'react';

export default function Tables({ theading, children, addClass }) {
  return (
    <div className=" overflow-visible border-b border-gray-200 sm:rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-slate-200/50 min-h-full">
      <table className="min-w-full divide-y divide-gray-200 relative h-64 transition-all duration-300 ease-in-out">
        <thead className="bg-blue-100 sticky top-0">
          <tr className="sticky top-0 h-16 w-full leading-none text-gray-400 border-b-2 border-gray-200">
            {theading.map((item) => (
              <th
                key={Math.random()}
                scope="col"
                className={[
                  'px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider whitespace-nowrap',
                  addClass,
                ].join(' ')}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
}
