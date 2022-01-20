import { ArrowLeftIcon } from '@heroicons/react/solid';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Input from '../atoms/Input';
import { Layout } from '../includes';

export default function PreviewInvoice() {
  const { id } = useParams();
  const history = useHistory();
  const UNBILL = useSelector((state) => state.unbill);

  return (
    <Layout titlePage={`Preview Invoice ${id}`}>
      <span
        onClick={() => history.goBack()}
        className="relative cursor-pointer flex w-fit mt-4 gap-2 pb-1 items-center hover:border-zinc-500 border-b-2 border-transparent transition-all duration-300 ease-in-out">
        <ArrowLeftIcon className="text-zinc-800 h-4" />
        <span className="text-sm font-medium">Kembali</span>
      </span>

      <div className="relative mt-8 p-4 rounded-md text-white flex justify-center items-center bg-blue-500 shadow-lg shadow-blue-500/50">
        <h1 className="text-xl font-semibold">
          {UNBILL.unbillSelected.id} -{' '}
          {UNBILL.unbillSelected.first_name +
            ' ' +
            UNBILL.unbillSelected.last_name}
        </h1>
      </div>

      <div className="relative bg-white rounded-lg grid grid-cols-2 gap-6 p-6 mt-12">
        {Object.entries(UNBILL.unbillSelected).map((item) => {
          return (
            <Input
              key={item[0]}
              label={item[0]}
              value={[item[1]]}
              readonly={true}
              disabled={true}
            />
          );
        })}
      </div>
    </Layout>
  );
}
