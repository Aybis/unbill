import React from 'react';

export default function TableContent({
  addClassRow,
  addClassChild,
  children,
  rowSpan = 1,
  colSpan = 1,
  handlerClick = null,
  data,
}) {
  return (
    <td
      onClick={handlerClick}
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={[addClassRow].join(' ')}>
      <div
        className={[
          'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
          addClassChild,
        ].join(' ')}>
        {children}
      </div>
    </td>
  );
}
