import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid';
import React from 'react';
import Pagination from 'react-js-pagination';

export default function SectionPagination({
  currentPage,
  perPage,
  total = 0,
  handlerClick,
  lastPage = 0,
}) {
  return (
    <div className="relative flex lg:justify-between justify-center items-center mt-8">
      <div className="relative font-medium text-zinc-700 hidden lg:block">
        <p>Total Data : {total} baris</p>
        <p>Total Halaman : {lastPage} halaman</p>
      </div>
      <div className="sticky right-4">
        <Pagination
          innerClass="relative flex gap-4"
          itemClassFirst="lg:p-2 text-zinc-600 font-medium border-b-2 border-transparent rounded-none bg-none hover:border-blue-500 transition-all duration-300 ease-in-out"
          itemClassLast="lg:p-2 text-zinc-600 font-medium border-b-2 border-transparent rounded-none bg-none hover:border-blue-500 transition-all duration-300 ease-in-out"
          prevPageText={
            <ChevronLeftIcon className="h-6 text-zinc-500 hover:bg-slate-50 rounded-md transition-all duration-300 ease-in-out" />
          }
          nextPageText={
            <ChevronRightIcon className="h-6 text-zinc-500 hover:bg-slate-50 rounded-md transition-all duration-300 ease-in-out" />
          }
          itemClass="lg:text-zinc-500 text-zinc-400 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all duration-300 ease-in-out lg:px-2 py-2 font-medium "
          activePage={currentPage}
          itemsCountPerPage={perPage}
          totalItemsCount={total}
          pageRangeDisplayed={6}
          onChange={handlerClick}
          firstPageText={
            <ChevronDoubleLeftIcon className="h-6 text-zinc-500 hover:bg-slate-50 rounded-md transition-all duration-300 ease-in-out" />
          }
          activeClass="lg:text-zinc-50 lg:bg-blue-500 hover:text-black text-zinc-900 font-bold lg:font-normal"
          lastPageText={
            <ChevronDoubleRightIcon className="h-6 text-zinc-500 hover:bg-slate-50 rounded-md transition-all duration-300 ease-in-out" />
          }
        />
      </div>
    </div>
  );
}
