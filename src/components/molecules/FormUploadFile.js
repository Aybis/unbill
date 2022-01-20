import React from 'react';
import { Button } from '../atoms';

export default function FormUploadFile({ handlerSubmit, isSubmit }) {
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
            name="file-upload"
            accept=".xlsx, .xls, .csv"
            type="file"
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-6 py-2 border border-transparent rounded-md"
          />
        </div>
      </div>
      <div className="pt-4 flex">
        <Button
          type={'submit'}
          isSubmit={isSubmit}
          moreClass={'disabled:bg-opacity-40 text-sm'}>
          Upload
        </Button>
      </div>
    </form>
  );
}
