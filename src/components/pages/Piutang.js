import { DocumentAddIcon, DocumentIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { fetchDataApi } from '../../redux/actions/piutang';
import {
  Loading,
  Modals,
  TableBody,
  TableContent,
  TableHeading,
} from '../atoms';
import { Layout } from '../includes';
import { Pagination } from '../molecules';

export default function Piutang() {
  const dispatch = useDispatch();
  const PIUTANG = useSelector((state) => state.piutang);
  const [search, setsearch] = useState('');
  const [loading, setloading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterData, setfilterData] = useState(PIUTANG?.listPiutang);

  const [state, setstate] = useState({
    allUsers: filterData,
    currentUsers: [],
    currentPage: null,
    totalPages: null,
  });

  const handlerOpenModalUpload = () => {};

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

  const handlerSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    setTimeout(() => {
      setIsSubmit(false);
      swal('Yeay!', 'Upload File Berhasil!', 'success');
      setShowModal(false);
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
      <div className="relative w-full my-8 px-4 py-6 rounded-md bg-white">
        <div className="relative flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              name="search"
              value={search}
              onChange={handlerSerachKaryawan}
              placeholder="Search"
              className="border border-zinc-200 bg-white px-4 py-2 font-medium rounded-md shadow shadow-slate-200/50 focus:border-blue-600 transition-all duration-300 ease-in-out placeholder:opacity-40 text-sm"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm rounded-md shadow-md shadow-blue-500/50 bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out px-4 py-2 text-white font-semibold flex justify-center items-center gap-2">
            <DocumentAddIcon className="h-5" />
            Upload File
          </button>
        </div>
        {PIUTANG.loading || loading ? (
          <div className="flex justify-center items-center mt-14">
            <Loading color={'text-blue-600'} height={6} width={6} />
          </div>
        ) : (
          <div className="overflow-auto relative max-w-full">
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
                      <button className="hover:bg-green-700 transition-all duration-300 ease-in-out flex justify-center items-center  flex-1 w-40 gap-2 bg-green-500 px-3  py-2 rounded-md text-white font-semibold">
                        <DocumentIcon className="h-5 " /> Detail Piutang
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

      <Modals
        open={showModal}
        handlerClose={setShowModal}
        title={'Upload File Data Piutang'}
        position="center">
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
            <button
              type="submit"
              disabled={isSubmit}
              className="disabled:bg-opacity-40 inline-flex justify-center gap-2 py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {isSubmit && (
                <Loading color={'text-white'} height={5} width={5} />
              )}
              Upload
            </button>
          </div>
        </form>
      </Modals>
    </Layout>
  );
}
