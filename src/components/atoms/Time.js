import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { convertDate } from '../../helpers/ConvertDate';

export default function Time({ moreClass }) {
  const [didMount, setDidMount] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setDidMount(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      setDidMount(false);
      clearInterval(interval);
    };
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <div
      className={['flex justify-center items-center w-full', moreClass].join(
        ' ',
      )}>
      <h1 className="text-xl font-semibold text-white">
        {convertDate('jamMenitDetik', time)}
        <small> {convertDate('jam', time) > 12 ? 'PM' : 'AM'}</small>
      </h1>
    </div>
  );
}
