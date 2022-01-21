import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import React from 'react';
import Pagination from 'react-js-pagination';

export default function SectionPagination({
  currentPage,
  perPage,
  total,
  handlerClick,
}) {
  return (
    <Pagination
      innerClass="relative flex gap-4 justify-end items-center mt-8"
      itemClassFirst="p-2 text-zinc-600 font-medium border-b-2 border-transparent rounded-none bg-none hover:border-blue-500 transition-all duration-300 ease-in-out"
      itemClassLast="p-2 text-zinc-600 font-medium border-b-2 border-transparent rounded-none bg-none hover:border-blue-500 transition-all duration-300 ease-in-out"
      prevPageText={
        <ChevronLeftIcon className="h-6 text-zinc-500 hover:bg-slate-50 rounded-md transition-all duration-300 ease-in-out" />
      }
      nextPageText={
        <ChevronRightIcon className="h-6 text-zinc-500 hover:bg-slate-50 rounded-md transition-all duration-300 ease-in-out" />
      }
      itemClass="text-zinc-500 hover:bg-slate-50 rounded-md transition-all duration-300 ease-in-out px-2 py-1 font-medium "
      activePage={currentPage}
      itemsCountPerPage={perPage}
      totalItemsCount={total}
      pageRangeDisplayed={10}
      onChange={handlerClick}
      firstPageText={'Pertama'}
      activeClass="text-zinc-50 bg-black"
      lastPageText={'Terakhir'}
    />
  );
}
