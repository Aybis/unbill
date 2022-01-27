import { XIcon } from '@heroicons/react/solid';
import React from 'react';
import { Button } from '../atoms';

export default function SectionFormSearch({
  handlerSearch,
  keyword,
  setKeyword,
  handlerRemoveSearch,
}) {
  return (
    <form
      className="relative flex flex-col lg:flex-row gap-4 w-full lg:w-fit"
      onSubmit={handlerSearch}>
      <div className="relative w-full lg:w-fit">
        <input
          type="text"
          name="search"
          value={keyword}
          autoComplete="off"
          onInput={(event) => setKeyword(event.target.value)}
          placeholder="Search"
          className="border appearance-none border-zinc-200 bg-white px-4 py-2 font-medium rounded-md shadow shadow-slate-200/50 focus:border-blue-600 transition-all duration-300 ease-in-out placeholder:opacity-40 text-sm w-full"
        />
        {keyword.length > 0 && (
          <XIcon
            className="absolute h-4 text-zinc-400 top-3 right-2 cursor-pointer hover:text-zinc-600 transition-all duration-300 ease-in-out"
            onClick={handlerRemoveSearch}
          />
        )}
      </div>
      <Button> {keyword.length > 0 ? 'Search' : 'Show All'}</Button>
    </form>
  );
}
