import React from 'react';

export default function Tables({ theading, children, addClass }) {
  return (
    <div className=" overflow-visible border-b border-gray-200 sm:rounded-lg shadow-lg shadow-slate-200/50 min-h-full">
      <table className="min-w-full divide-y divide-gray-200 relative h-full">
        <thead className="bg-gray-50 sticky top-0">
          <tr className="sticky top-0 h-16 w-full leading-none text-gray-400 border-b-2 border-gray-200">
            {theading.map((item) => (
              <th
                key={Math.random()}
                scope="col"
                className={[
                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
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
