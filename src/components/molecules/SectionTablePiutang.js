import { DocumentIcon } from '@heroicons/react/solid';
import React from 'react';
import { useSelector } from 'react-redux';
import { SectionPagination } from '.';
import { Loading, TableBody, TableContent, TableHeading } from '../atoms';

export default function SectionTablePiutang({
  handlerPagination,
  handlerClickDetail,
}) {
  const PIUTANG = useSelector((state) => state.piutang);

  return (
    <div className="relative w-full my-8 rounded-md bg-white">
      <div className="overflow-auto relative max-w-full border-b-2 border-zinc-200">
        <TableHeading
          theading={['No', 'Action'].concat(
            PIUTANG.loading
              ? ''
              : PIUTANG?.tableHeader?.filter(
                  (item) =>
                    item !== 'id' &&
                    item !== 'created_at' &&
                    item !== 'updated_at',
                ),
          )}>
          {PIUTANG.loading ? (
            <TableBody>
              <TableContent
                rowSpan={PIUTANG?.tableHeader?.length + 2}
                colSpan={PIUTANG?.tableHeader?.length + 2}>
                <div className="flex justify-center items-center mt-14">
                  <Loading color={'text-blue-600'} height={6} width={6} />
                </div>
              </TableContent>
            </TableBody>
          ) : PIUTANG?.listPiutang?.length < 1 ? (
            <TableBody>
              <TableContent
                rowSpan={PIUTANG?.tableHeader?.length + 2}
                colSpan={PIUTANG?.tableHeader?.length + 2}>
                Tidak Ada Data
              </TableContent>
            </TableBody>
          ) : (
            PIUTANG?.listPiutang?.map((item) => {
              return (
                <TableBody key={Math.random()}>
                  <TableContent>{item.id}</TableContent>
                  <TableContent>
                    <button
                      onClick={() => handlerClickDetail(item)}
                      className="flex gap-2 items-center justify-center bg-indigo-600 shadow-md shadow-indigo-500/50 hover:bg-indigo-500 transition-all duration-300 ease-in-out text-white font-semibold rounded-md px-4 py-2">
                      <DocumentIcon className="h-4" /> Detail Piutang
                    </button>
                  </TableContent>
                  {PIUTANG.tableHeader
                    .filter(
                      (item) =>
                        item !== 'id' &&
                        item !== 'created_at' &&
                        item !== 'updated_at',
                    )
                    .map((nameField) => {
                      return (
                        <TableContent key={Math.random()}>
                          {nameField === 'assignment'
                            ? parseInt(item[nameField])
                            : item[nameField]}
                        </TableContent>
                      );
                    })}
                </TableBody>
              );
            })
          )}
        </TableHeading>
      </div>

      {PIUTANG?.listPiutang?.length > 0 ? (
        <SectionPagination
          currentPage={PIUTANG?.allPage?.current_page}
          perPage={PIUTANG?.allPage?.per_page}
          total={PIUTANG?.allPage?.total}
          handlerClick={handlerPagination}
        />
      ) : (
        ' '
      )}
    </div>
  );
}
