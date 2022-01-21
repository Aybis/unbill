import { ArrowLeftIcon } from '@heroicons/react/solid';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function SectionBarPreview({ name, subname }) {
  const history = useHistory();

  return (
    <>
      <span
        onClick={() => history.goBack()}
        className="relative cursor-pointer flex w-fit mt-4 gap-2 pb-1 items-center hover:border-zinc-500 border-b-2 border-transparent transition-all duration-300 ease-in-out">
        <ArrowLeftIcon className="text-zinc-800 h-4" />
        <span className="text-sm font-medium">Kembali</span>
      </span>

      <div className="relative mt-8 p-4 rounded-md text-white flex justify-center items-center bg-blue-500 shadow-lg shadow-blue-500/50">
        <h1 className="text-xl font-semibold">
          {name} - {subname}
        </h1>
      </div>
    </>
  );
}
