import {
  DatabaseIcon,
  DocumentAddIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataApi } from '../../redux/actions/piutang';
import { fetchDataUnbill } from '../../redux/actions/unbill';
import { Loading, TableBody, TableContent, TableHeading } from '../atoms';
import { Layout } from '../includes';
import { Pagination } from '../molecules';

export default function Piutang() {
  const dispatch = useDispatch();
  const UNBILL = useSelector((state) => state.unbill);
  const [search, setsearch] = useState('');
  const [loading, setloading] = useState(false);
  const [filterData, setfilterData] = useState(UNBILL?.listUnbill);
  console.log(UNBILL);
  const [state, setstate] = useState({
    allUsers: filterData,
    currentUsers: [],
    currentPage: null,
    totalPages: null,
  });

  const onPageChanged = (data) => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = filterData.slice(offset, offset + pageLimit);
    setstate({ currentPage, currentUsers, totalPages });
  };

  const handlerSearchData = (event) => {
    setloading(true);
    setsearch(event.target.value);
    let result = UNBILL?.listUnbill.filter(
      (item) => item.strain.toLowerCase().search(event.target.value) !== -1,
    );
    setfilterData(result);
    setTimeout(() => {
      setloading(false);
    }, 400);
  };

  const handlerClickData = (event, item) => {
    console.log(event.target.name);
    console.log(item);
  };

  useEffect(() => {
    setloading(true);
    dispatch(fetchDataUnbill()).then((res) => {
      setfilterData(res);
    });
    setloading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout titlePage="List Unbill">
      <div className="relative w-full my-8 p-2">
        <div className="relative flex gap-4 items-center mb-4">
          <div className="relative">
            <SearchIcon className="absolute top-2 h-5 w-5 left-4 text-zinc-400" />
            <input
              type="text"
              name="search"
              value={search}
              onChange={handlerSearchData}
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
                state.currentUsers.map((item, index) => (
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
        {loading ? (
          ''
        ) : (
          <div className="flex justify-between items-center mt-4">
            {filterData.length > 0 ? (
              state.currentPage && (
                <span className="text-xs lg:text-base current-page d-inline-block h-100 pl-4 text-gray-400">
                  Page{' '}
                  <span className="ml-1 font-semibold text-gray-800">
                    {state.currentPage}
                  </span>{' '}
                  /{' '}
                  <span className="font-semibold text-gray-600">
                    {state.totalPages}
                  </span>{' '}
                  -{' '}
                  <span className="font-semibold text-gray-600">
                    {filterData.length} data
                  </span>
                </span>
              )
            ) : (
              <p className="text-center w-full">Tidak ada data</p>
            )}
            <Pagination
              totalRecords={filterData.length ?? 0}
              pageLimit={10}
              pageNeighbours={1}
              onPageChanged={onPageChanged}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
