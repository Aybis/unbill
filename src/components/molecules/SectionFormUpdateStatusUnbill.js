import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../atoms';

export default function SectionFormUpdateStatusUnbill({
  handlerModal,
  setStatusValue,
  handlerSubmit,
  isSubmit,
}) {
  const UNBILL = useSelector((state) => state.unbill);
  const status = [
    { id: 'OK', title: 'OK' },
    { id: 'NOK', title: 'NOK' },
    { id: 'TIDAK PERLU', title: 'TIDAK PERLU' },
  ];

  return (
    <>
      <form onSubmit={handlerSubmit} className="relative text-left p-4">
        <label className="text-base font-medium text-gray-900 uppercase">
          {UNBILL?.dokumenSelected?.name}
        </label>
        <p className="text-sm leading-5 text-gray-500">
          Set keperluan dokumen?
        </p>
        <fieldset className="mt-4">
          <legend className="sr-only">status</legend>
          <div status="space-y-4" className="space-y-3">
            {status.map((item) => (
              <div key={item.id} className="flex items-center">
                <input
                  id={item.id}
                  name="notification-method"
                  type="radio"
                  onChange={() => setStatusValue(item.id)}
                  defaultChecked={
                    UNBILL?.dokumenSelected?.value === item.id ?? ''
                  }
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor={item.id}
                  className="ml-3 block text-sm font-medium text-gray-700">
                  {item.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="relative flex gap-4 mt-8">
          <Button isSubmit={isSubmit}> Update</Button>
        </div>
      </form>
      <div className="relative flex justify-end">
        <Button handlerClick={() => handlerModal(false)} type="out">
          Close
        </Button>
      </div>
    </>
  );
}
