import { ArrowLeftIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../atoms';
import { Layout } from '../includes';

export default function PreviewFile() {
  const UNBILL = useSelector((state) => state.unbill);
  const { id } = useParams();
  const [didMount, setDidMount] = useState(false);
  const history = useHistory();
  const [isSubmit, setisSubmit] = useState(false);

  const handlerSubmit = (event) => {
    event.preventDefault();
    setisSubmit(true);
    setTimeout(() => {
      setisSubmit(false);
    }, 300);
  };

  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <Layout titlePage={`Upload File - ${id}`}>
      {id && (
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

      <div className="relative mt-12 bg-white p-6 rounded-lg">
        <h1 className="text-zinc-800 font-semibold">File Upload</h1>
        <form onSubmit={handlerSubmit}>
          <div className="relative"></div>
          <div className="relative flex justify-start items-center mt-8 gap-4">
            <Button isSubmit={isSubmit}> Update</Button>
            <Button type={'out'} handlerClick={() => history.goBack()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
