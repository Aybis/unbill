import React from 'react';
import { convertDate } from '../../helpers/ConvertDate';
import { Loading } from '../atoms';

export default function FormUploadFile({
  handlerSubmit,
  isSubmit,
  status,
  form,
  handlerChangeFile,
}) {
  return (
    <form className="mt-8" onSubmit={handlerSubmit}>
      <div className="relative">
        <label
          htmlFor="cover-photo"
          className="block text-left mb-4 text-sm font-medium text-gray-700">
          Upload File
        </label>
        <div className="mt-1 flex justify-start px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded">
          <input
            name="file"
            accept=".xlsx, .xls, .csv"
            type="file"
            onChange={handlerChangeFile}
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-6 py-2 border border-transparent rounded-md"
          />
        </div>
        {form.selected ? (
          <div className="text-left relative mt-4 flex flex-col gap-2 ">
            <p className="text-sm font-medium text-zinc-600">
              Nama File: {form.file.name}
            </p>
            <p className="text-sm font-medium text-zinc-600">
              Ukuran File: {form.file.size} byte
            </p>
            <p className="text-sm font-medium text-zinc-600">
              Last Modified:{' '}
              {convertDate('tanggalHari', form.file.lastModifiedDate)}
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
      {form.selected ? (
        <div className="pt-4 flex gap-4 items-center">
          <button
            type="submit"
            disabled={isSubmit}
            className="disabled:bg-opacity-40 inline-flex justify-center gap-2 py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {isSubmit && <Loading color={'text-white'} height={5} width={5} />}
            Upload
          </button>
          <p className="text-zinc-500 text-sm font-medium">{status}</p>
        </div>
      ) : (
        <p className="text-zinc-500 font-medium text-sm mt-4">
          Pilih File terlebih dahulu
        </p>
      )}
    </form>
  );
}
