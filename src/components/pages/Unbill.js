import {
  DatabaseIcon,
  DocumentAddIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDataUnbill, setUnbilSelected } from '../../redux/actions/unbill';
import { Loading, TableBody, TableContent, TableHeading } from '../atoms';
import { Layout } from '../includes';

export default function Piutang() {
  const dispatch = useDispatch();
  const UNBILL = useSelector((state) => state.unbill);
  const [didMount, setDidMount] = useState(false);
  const [loading, setloading] = useState(false);
  const history = useHistory();

  const handlerClickData = (event, item) => {
    let name = event.target.name;
    dispatch(setUnbilSelected(item));
    if (name === 'piutang') {
      history.push(`piutang/${item.uid}`);
    }
    if (name === 'invoice') {
      history.push(`invoice/${item.uid}`);
    }
    if (name === 'file') {
      history.push(`file/${item.uid}`);
    }
  };

  useEffect(() => {
    setloading(true);
    dispatch(fetchDataUnbill());
    setloading(false);
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
    <Layout titlePage="List Unbill">
      <div className="relative w-full my-8 p-2">
        <div className="relative flex gap-4 items-center mb-4">
          <div className="relative">
            <SearchIcon className="absolute top-2 h-5 w-5 left-4 text-zinc-400" />
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="border text-sm border-zinc-200 bg-white pl-10 px-4 py-2 font-medium rounded-md shadow shadow-slate-200/50 focus:border-blue-600 transition-all duration-300 ease-in-out placeholder:opacity-40"
            />
          </div>
          <button className="text-sm px-6 py-2 rounded-md text-white bg-blue-600 font-medium hover:bg-blue-700 transition-all duration-300 ease-in-out">
            Search
          </button>
        </div>
        {UNBILL.loading || loading ? (
          <div className="flex justify-center items-center mt-24">
            <Loading color={'text-blue-600'} height={6} width={6} />
          </div>
        ) : (
          <div
            className="overflow-auto relative max-w-full"
            style={{ height: '38rem' }}>
            <TableHeading
              theading={[
                'No',
                'Action',
                'uid',
                'username',
                'first_name',
                'last_name',
                'gender',
                'phone_number',
                'social_insurance_number',
                'email',
                'date_of_birth',
              ]}>
              {UNBILL?.listUnbill?.length > 0 &&
                UNBILL?.listUnbill.map((item, index) => (
                  <TableBody key={Math.random()}>
                    <TableContent
                      addClassChild={'px-8 flex justify-center items-center'}>
                      {index + 1}
                    </TableContent>
                    <TableContent addClassChild={'flex flex-col gap-2'}>
                      <button
                        onClick={(e) => handlerClickData(e, item)}
                        name="piutang"
                        className="flex justify-center items-center  flex-1 w-40 gap-2 bg-green-500 px-3  py-2 rounded-md text-white font-semibold">
                        <DatabaseIcon className="h-5 " /> List Piutang
                      </button>
                      <button
                        onClick={(e) => handlerClickData(e, item)}
                        name="invoice"
                        className="flex gap-2 justify-center items-center bg-indigo-500 px-3 w-40 py-2 rounded-md text-white font-semibold">
                        <DatabaseIcon className="h-5 " /> List Invoice
                      </button>
                      <button
                        onClick={(e) => handlerClickData(e, item)}
                        name="file"
                        className="flex justify-center items-center gap-2 bg-blue-500 px-3 w-40 py-2 rounded-md text-white font-semibold">
                        <DocumentAddIcon className="h-5" />
                        Update File
                      </button>
                    </TableContent>
                    <TableContent>{item.uid}</TableContent>
                    <TableContent>{item.username}</TableContent>
                    <TableContent>{item.first_name}</TableContent>
                    <TableContent>{item.last_name}</TableContent>
                    <TableContent>{item.gender}</TableContent>
                    <TableContent>{item.phone_number}</TableContent>
                    <TableContent>{item.social_insurance_number}</TableContent>
                    <TableContent>{item.email}</TableContent>
                    <TableContent>{item.date_of_birth}</TableContent>
                  </TableBody>
                ))}
            </TableHeading>
          </div>
        )}
      </div>
    </Layout>
  );
}
