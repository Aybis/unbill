import { DatabaseIcon, DocumentAddIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataApi } from '../../redux/actions/piutang';
import { Loading, TableBody, TableContent, TableHeading } from '../atoms';
import { Layout } from '../includes';
import { Pagination } from '../molecules';

export default function Piutang() {
  const dispatch = useDispatch();
  const PIUTANG = useSelector((state) => state.piutang);
  const [search, setsearch] = useState('');
  const [loading, setloading] = useState(false);
  const [filterData, setfilterData] = useState(PIUTANG?.listPiutang);

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

  const handlerSerachKaryawan = (event) => {
    setloading(true);
    setsearch(event.target.value);
    let result = PIUTANG?.listPiutang.filter(
      (item) => item.strain.toLowerCase().search(event.target.value) !== -1,
    );
    setfilterData(result);
    setTimeout(() => {
      setloading(false);
    }, 400);
  };

  useEffect(() => {
    setloading(true);
    dispatch(fetchDataApi()).then((res) => {
      setfilterData(res);
      setloading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout titlePage="List Piutang">
      <div className="relative w-full my-8 p-2">
        <div className="relative flex justify-between items-center mb-8">
          <div className="relative">
            <input
              type="text"
              name="search"
              value={search}
              onChange={handlerSerachKaryawan}
              placeholder="Search"
              className="border border-zinc-200 bg-white px-4 py-3 font-medium rounded-md shadow shadow-slate-200/50 focus:border-blue-600 transition-all duration-300 ease-in-out placeholder:opacity-40"
            />
          </div>
          <button className=" rounded-md shadow-md shadow-blue-500/50 bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out px-4 py-3 text-white font-semibold flex justify-center items-center gap-2">
            <DocumentAddIcon className="h-5" />
            Upload File
          </button>
        </div>
        {PIUTANG.loading || loading ? (
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
                'strain',
                'cannabinoid_abbreviation',
                'cannabinoid',
                'terpene',
                'medical_use',
                'health_benefit',
                'category',
                'type',
                'buzzword',
                'brand',
              ]}>
              {PIUTANG.listPiutang.length > 0 &&
                state.currentUsers.map((item, index) => (
                  <TableBody key={Math.random()}>
                    <TableContent
                      addClassChild={'px-8 flex justify-center items-center'}>
                      {index + 1}
                    </TableContent>
                    <TableContent addClassChild={'flex flex-col gap-2'}>
                      <button className="flex justify-center items-center  flex-1 w-40 gap-2 bg-green-500 px-3  py-2 rounded-md text-white font-semibold">
                        <DatabaseIcon className="h-5 " /> Detail Piutang
                      </button>
                      <button className="flex gap-2 justify-center items-center bg-indigo-500 px-3 w-40 py-2 rounded-md text-white font-semibold">
                        <DatabaseIcon className="h-5 " /> List Invoice
                      </button>
                      <button className="flex justify-center items-center gap-2 bg-blue-500 px-3 w-40 py-2 rounded-md text-white font-semibold">
                        <DocumentAddIcon className="h-5" />
                        File
                      </button>
                    </TableContent>
                    <TableContent>{item.uid}</TableContent>
                    <TableContent>{item.strain}</TableContent>
                    <TableContent>{item.cannabinoid_abbreviation}</TableContent>
                    <TableContent>{item.cannabinoid}</TableContent>
                    <TableContent>{item.terpene}</TableContent>
                    <TableContent>{item.medical_use}</TableContent>
                    <TableContent>{item.health_benefit}</TableContent>
                    <TableContent>{item.category}</TableContent>
                    <TableContent>{item.type}</TableContent>
                    <TableContent>{item.buzzword}</TableContent>
                    <TableContent>{item.brand}</TableContent>
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
