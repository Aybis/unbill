import { SearchIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Pagination } from '.';
import { fetchDataInvioiceByIo } from '../../redux/actions/invoice';
import { Loading, TableBody, TableContent, TableHeading } from '../atoms';

export default function SectionTableInvoice() {
  const { io } = useParams();
  const fieldRupiah = ['dpp', 'ppn', 'jumlah', 'diterima'];
  const [search, setsearch] = useState('');
  const INVOICE = useSelector((state) => state.invoice);
  const [loading, setloading] = useState(false);
  const [filterData, setfilterData] = useState(
    INVOICE.listInvoice.length > 0
      ? INVOICE.listInvoice.sort((a, b) =>
          new Date(a.tgl_inv) < new Date(b.tgl_inv)
            ? 1
            : -1 && parseInt(a.dpp) < parseInt(b.dpp)
            ? 1
            : -1,
        )
      : 0,
  );
  const dispatch = useDispatch();
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

  const handlerSearch = (event) => {
    setloading(true);
    setsearch(event.target.value);
    let result = INVOICE.listInvoice.filter((item) => {
      return (
        item.customer
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        item.dpp
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        item.jumlah
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        item.no_inv
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        item.ppn
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        item.tgl_bayar
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        item.tgl_inv
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        item.diterima
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
    });

    setfilterData(result);
    setTimeout(() => {
      setloading(false);
    }, 400);
  };

  useEffect(() => {
    setloading(true);
    dispatch(fetchDataInvioiceByIo(io)).then((res) => {
      let data = res.data.sort((a, b) =>
        new Date(a.tgl_inv) < new Date(b.tgl_inv)
          ? 1
          : -1 && parseInt(a.dpp) < parseInt(b.dpp)
          ? 1
          : -1,
      );
      setfilterData(data);
      setloading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <div className="mt-8 overflow-auto">
        <div className="flex relative w-1/3 mb-4 p-1">
          <SearchIcon className="h-6 w-6 text-zinc-200 absolute left-4 top-4" />
          <input
            type="text"
            autoComplete={'off'}
            name="search"
            placeholder="Search"
            value={search}
            onChange={(event) => handlerSearch(event)}
            className="px-4 py-2 border-2 border-zinc-200 text-lg text-zinc-800 focus:ring-sky-500 focus:border-sky-500 block rounded-md placeholder-opacity-50 placeholder-gray-500 pl-12"
          />
        </div>
        <TableHeading
          theading={['No'].concat(
            INVOICE?.tableHeader?.length > 0
              ? INVOICE?.tableHeader.map((item) => item.split('_').join(' '))
              : '',
          )}>
          {loading ? (
            <TableBody>
              <TableContent rowSpan={10} colSpan={10}>
                <div className="flex justify-center items-center">
                  <Loading color={'text-blue-600'} height={6} width={6} />
                </div>
              </TableContent>
            </TableBody>
          ) : state.currentUsers.length > 0 ? (
            state.currentUsers.map((item, index) => {
              return (
                <TableBody key={Math.random()}>
                  <TableContent>{index + 1}</TableContent>
                  {INVOICE.tableHeader.map((nameField) => {
                    return (
                      <TableContent key={Math.random()}>
                        {fieldRupiah.indexOf(nameField) > -1
                          ? 'Rp ' +
                            parseInt(item[nameField]).toLocaleString('id')
                          : item[nameField]}
                      </TableContent>
                    );
                  })}
                </TableBody>
              );
            })
          ) : (
            <TableBody>
              <TableContent rowSpan={10} colSpan={10}>
                <div className="flex justify-center items-center">
                  Tidal Ada Data
                </div>
              </TableContent>
            </TableBody>
          )}
        </TableHeading>
      </div>

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
                  {filterData.length}
                </span>
              </span>
            )
          ) : (
            <p className="text-center w-full"></p>
          )}
          <Pagination
            totalRecords={filterData.length ?? 0}
            pageLimit={10}
            pageNeighbours={1}
            onPageChanged={onPageChanged}
          />
        </div>
      )}
    </>
  );
}
