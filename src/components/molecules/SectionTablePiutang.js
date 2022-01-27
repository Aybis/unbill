import { DocumentIcon } from '@heroicons/react/solid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SectionPagination } from '.';
import {
  fetchDataPiutang,
  fetchDataPiutangByIO,
  setPiutangSelected,
  setTypePage,
} from '../../redux/actions/piutang';
import { Loading, TableBody, TableContent, TableHeading } from '../atoms';

export default function SectionTablePiutang({ fromPage = 'piutang' }) {
  const history = useHistory();
  const dispatch = useDispatch();
  let amount_in_dc = [];
  let amt_in_loc_cur = [];
  const PIUTANG = useSelector((state) => state.piutang);
  const UNBILL = useSelector((state) => state.unbill);
  const handlerPagination = (item) => {
    if (fromPage === 'piutang') {
      dispatch(fetchDataPiutang(UNBILL.temporary, item));
    } else {
      dispatch(
        fetchDataPiutangByIO(
          UNBILL?.unbillSelected?.ref_key,
          UNBILL?.temporary,
          item,
        ),
      );
    }
  };

  const fieldRupiah = ['amount_in_dc', 'amt_in_loc_cur'];

  const handlerClickDetail = (item) => {
    dispatch(setPiutangSelected(item));
    dispatch(setTypePage('preview'));

    history.push(`/preview-piutang/${item.id}`);
  };

  return (
    <div className="relative w-full my-8 rounded-md bg-white">
      <div
        className="overflow-auto  relative max-w-full border-b-2 border-zinc-200"
        style={{
          maxHeight: '40rem',
        }}>
        <TableHeading
          theading={['No', 'Action'].concat(
            PIUTANG.loading
              ? 2
              : PIUTANG?.tableHeader?.length > 0
              ? PIUTANG?.tableHeader
                  ?.filter(
                    (item) =>
                      item !== 'id' &&
                      item !== 'created_at' &&
                      item !== 'updated_at',
                  )
                  .map((item) =>
                    item === 'id_invoice' ? 'id' : item.split('_').join(' '),
                  )
              : '',
          )}
          footer={
            <TableBody addClass={'border-y-2 border-zinc-400 bg-blue-50'}>
              <TableContent>Total</TableContent>
              <TableContent>
                Rp
                {PIUTANG.loading
                  ? 0
                  : PIUTANG.listPiutang.length > 0
                  ? PIUTANG.listPiutang.map((item) => {
                      return amount_in_dc.push(item.amount_in_dc);
                    })
                  : 0}
                {amount_in_dc.length > 0 &&
                  amount_in_dc
                    .reduce((curr, next) => curr + next)
                    .toLocaleString('id')}
              </TableContent>
              <TableContent>
                Rp
                {PIUTANG.loading
                  ? 0
                  : PIUTANG.listPiutang.length > 0
                  ? PIUTANG.listPiutang.map((item) => {
                      return amt_in_loc_cur.push(item.amt_in_loc_cur);
                    })
                  : 0}
                {amt_in_loc_cur.length > 0 &&
                  amt_in_loc_cur
                    .reduce((curr, next) => curr + next)
                    .toLocaleString('id')}
              </TableContent>
              <TableContent
                rowSpan={PIUTANG.loading ? 1 : PIUTANG?.tableHeader?.length - 3}
                colSpan={
                  PIUTANG.loading ? 1 : PIUTANG?.tableHeader?.length - 3
                }></TableContent>
            </TableBody>
          }>
          {PIUTANG.loading ? (
            <TableBody>
              <TableContent
                rowSpan={PIUTANG.loading ? 2 : PIUTANG?.tableHeader?.length + 2}
                colSpan={
                  PIUTANG.loading ? 2 : PIUTANG?.tableHeader?.length + 2
                }>
                <div className="flex justify-center items-center mt-14">
                  <Loading color={'text-blue-600'} height={6} width={6} />
                </div>
              </TableContent>
            </TableBody>
          ) : PIUTANG?.listPiutang?.length > 0 ? (
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
                            : fieldRupiah.indexOf(nameField) > -1
                            ? parseInt(item[nameField])
                              ? 'Rp ' +
                                parseInt(item[nameField]).toLocaleString('id')
                              : item[nameField]
                            : item[nameField]}
                        </TableContent>
                      );
                    })}
                </TableBody>
              );
            })
          ) : (
            <TableBody>
              <TableContent
                rowSpan={PIUTANG.loading ? 2 : PIUTANG?.tableHeader?.length + 2}
                colSpan={
                  PIUTANG.loading ? 2 : PIUTANG?.tableHeader?.length + 2
                }>
                Tidak Ada Data
              </TableContent>
            </TableBody>
          )}
        </TableHeading>
      </div>

      {PIUTANG?.listPiutang?.length > 0 ? (
        <SectionPagination
          currentPage={PIUTANG?.allPage?.current_page}
          perPage={PIUTANG?.allPage?.per_page}
          total={PIUTANG?.allPage?.total}
          handlerClick={handlerPagination}
          lastPage={PIUTANG?.allPage?.last_page}
        />
      ) : (
        ' '
      )}
    </div>
  );
}
