import { DocumentIcon } from '@heroicons/react/solid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SectionPagination } from '.';
import { fetchDataUnbill, setUnbilSelected } from '../../redux/actions/unbill';
import { Loading, TableBody, TableContent, TableHeading } from '../atoms';

export default function SectionTableUnbill() {
  const UNBILL = useSelector((state) => state.unbill);
  const history = useHistory();
  const dispatch = useDispatch();

  const handlerPagination = async (item) => {
    await dispatch(fetchDataUnbill(UNBILL.temporary, item));
  };

  const handlerClickDetail = (item) => {
    dispatch(setUnbilSelected(item));
    history.push(`/unbill/${item.ref_key}`);
  };

  return (
    <div className="overflow-auto relative max-w-full">
      <TableHeading
        theading={['No', 'Action'].concat(
          UNBILL?.tableHeader?.length > 0
            ? UNBILL?.tableHeader
                ?.filter((item) => item !== 'id')
                .map((item) => item.split('_').join(' '))
            : '',
        )}>
        {UNBILL.loading ? (
          <TableBody>
            <TableContent
              rowSpan={UNBILL?.tableHeader.length + 2}
              colSpan={UNBILL?.tableHeader.length + 2}>
              <div className="flex justify-start items-center">
                <Loading color={'text-blue-600'} height={6} width={6} />
              </div>
            </TableContent>
          </TableBody>
        ) : UNBILL?.listUnbill?.length > 0 ? (
          UNBILL?.listUnbill?.map((item) => {
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
                {UNBILL.tableHeader
                  .filter((item) => item !== 'id')
                  .map((nameField) => {
                    return (
                      <TableContent key={Math.random()}>
                        {item[nameField] === '' ? '-' : item[nameField]}
                      </TableContent>
                    );
                  })}
              </TableBody>
            );
          })
        ) : (
          <TableBody>
            <TableContent
              rowSpan={UNBILL?.tableHeader.length + 2}
              colSpan={UNBILL?.tableHeader.length + 2}>
              Tidak Ada Data
            </TableContent>
          </TableBody>
        )}
      </TableHeading>

      {UNBILL?.listUnbill?.length > 0 ? (
        <SectionPagination
          currentPage={UNBILL?.allPage?.current_page}
          perPage={UNBILL?.allPage?.per_page}
          total={UNBILL?.allPage?.total}
          lastPage={UNBILL?.allPage?.last_page}
          handlerClick={handlerPagination}
        />
      ) : (
        ' '
      )}
    </div>
  );
}
