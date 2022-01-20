import { ArrowLeftIcon, DocumentIcon } from '@heroicons/react/solid';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Input, TableBody, TableContent, TableHeading } from '../atoms';
import { Layout } from '../includes';

export default function Invoice() {
  const { io } = useParams();
  const history = useHistory();
  const UNBILL = useSelector((state) => state.unbill);

  const handlerPreviewInvoice = () => {
    history.push(`/preview-invoice/${io}`);
  };
  return (
    <Layout titlePage={`List Invoice : ${io}`}>
      {io && (
        <>
          <span
            onClick={() => history.goBack()}
            className="relative cursor-pointer flex w-fit mt-4 gap-2 pb-1 items-center hover:border-zinc-500 border-b-2 border-transparent transition-all duration-300 ease-in-out">
            <ArrowLeftIcon className="text-zinc-800 h-4" />
            <span className="text-sm font-medium">Kembali</span>
          </span>
          <div className="relative mt-8 p-4 rounded-md text-white flex justify-center items-center bg-blue-500 shadow-lg shadow-blue-400/50">
            <h1 className="text-xl font-semibold">
              {UNBILL.unbillSelected.id} -{' '}
              {UNBILL.unbillSelected.first_name +
                ' ' +
                UNBILL.unbillSelected.last_name}
            </h1>
          </div>
        </>
      )}

      <div className="relative bg-white p-6 rounded-lg mt-12">
        <h1 className="font-semibold text-zinc-800">List Data</h1>

        <form className="mt-4 inline-flex items-center gap-4 relative">
          <div className="w-52">
            <Input
              placeholder="Search Invoice"
              name={'search'}
              inputClassName={'placeholder:opacity-60'}
            />
          </div>
          <div className="relative">
            <Button value={'Search'} />
          </div>
        </form>

        <div className="relative w-full overflow-auto mt-4 ">
          <TableHeading theading={['No', 'Action', 'No. Invoice', 'Deskripsi']}>
            <TableBody>
              <TableContent>1</TableContent>
              <TableContent>
                <button
                  onClick={() => handlerPreviewInvoice()}
                  className="bg-green-500 hover:bg-green-700 transition-all duration-300 ease-in-out flex justify-center items-center gap-2 text-white font-semibold text-sm rounded-md px-4 py-2">
                  <DocumentIcon className="h-5" />
                  Preview Invoice
                </button>
              </TableContent>
              <TableContent>0123456789</TableContent>
              <TableContent>Pembelian Macbook Pro 16 Inch M1 Max</TableContent>
            </TableBody>
          </TableHeading>
        </div>
      </div>
    </Layout>
  );
}
