import React from 'react';

export default function Card({ addClass, children }) {
  return (
    <div
      className={[
        'relative max-w-7xl container mx-auto my-4 px-4 lg:px-0',
        addClass,
      ].join(' ')}>
      {children}
    </div>
  );
}
