import { DownloadIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDataTableHeaderPiutang } from '../../redux/actions/piutang';
import {
  fetchDataUnbill,
  setTableHeaderUnbill,
  setTemporary,
} from '../../redux/actions/unbill';
import { Layout } from '../includes';
import { SectionFormSearch, SectionTableUnbill } from '../molecules';

export default function Unbill() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState(' ');
  const [didMount, setDidMount] = useState(false);

  const handlerRemoveSearch = () => {
    setKeyword('');
    dispatch(setTemporary(keyword));
  };

  const handlerSearch = (event) => {
    event.preventDefault();
    dispatch(setTemporary(keyword ?? ''));
    dispatch(fetchDataUnbill(keyword ?? ''));
  };

  const handlerFilterMansol = () => {
    dispatch(setTemporary('mansol'));
    dispatch(fetchDataUnbill('mansol'));
  };

  useEffect(() => {
    dispatch(setTableHeaderUnbill());
    dispatch(fetchDataTableHeaderPiutang());
    dispatch(setTemporary(''));
    dispatch(fetchDataUnbill());
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!didMount) {
    return null;
  }

  return (
    <Layout titlePage={`List Unbill `}>
      <div className="relative w-full my-8 px-4 py-6 rounded-md bg-white overflow-auto">
        <SectionFormSearch
          keyword={keyword}
          setKeyword={setKeyword}
          handlerRemoveSearch={handlerRemoveSearch}
          handlerSearch={handlerSearch}
        />
        <div
          onClick={() => handlerFilterMansol()}
          className="relative my-4 bg-zinc-50 px-4 py-2 rounded-md w-fit cursor-pointer hover:bg-zinc-100 transition-all duration-300 ease-in-out border border-zinc-100 focus:border-zinc-200 text-zinc-700 font-medium focus:shadow-md active:shadow-md shadow-zinc-300">
          Mansol
        </div>
        <div className="relative lg:absolute lg:top-4 lg:right-4">
          <a
            href={`${process.env.REACT_APP_API_BILLING}unbilled/download?keyword=${keyword}`}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition-all duration-300 ease-in-out cursor-pointer text-white font-semibold flex gap-2 justify-center items-center">
            <DownloadIcon className="h-5" />
            Download Data
          </a>
        </div>
        <SectionTableUnbill />
      </div>
    </Layout>
  );
}
