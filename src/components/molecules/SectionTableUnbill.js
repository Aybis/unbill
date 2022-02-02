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
  const filterTable = [
    'deskripsi_project',
    'follow_up',
    'kendala_unbilled',
    'kendala_dokumen',
    'kategori',
    'catatan_bilco',
    'catatan_ubis',
    'catatan_operation',
    'catatan_sdv',
  ];

  const rupiahTable = [
    'sum_of_amt_in_loc_acur',
    '1._<_1',
    '2._1_-_3',
    '3._4_-_6',
    '4._7_-_12',
    '5._>_12',
    'grand_total',
    'ar_unbilled_(>_2_bulan)',
    'ar_current_(<_2_bulan)',
    'billed_mtd',
    'saldo_unbilled_mtd',
  ];

  const handlerPagination = async (item) => {
    await dispatch(fetchDataUnbill(UNBILL.temporary, item));
  };

  const handlerClickDetail = (item) => {
    dispatch(setUnbilSelected(item));
    history.push(`/unbill/${item.ref_key}`);
  };

  return (
    <div className="relative w-full my-8 rounded-md bg-white">
      <div
        className="overflow-auto relative max-w-full border-b-2 border-zinc-200"
        style={{ maxHeight: '40rem' }}>
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
            UNBILL?.listUnbill?.map((item, index) => {
              return (
                <TableBody key={item.id}>
                  <TableContent>
                    {`${
                      UNBILL?.allPage?.current_page - 1 === 0
                        ? index + 1
                        : index + 1 === 10
                        ? UNBILL?.allPage?.current_page + '' + 0
                        : UNBILL?.allPage?.current_page - 1 + '' + (index + 1)
                    }`}
                  </TableContent>
                  <TableContent>
                    <button
                      onClick={() => handlerClickDetail(item)}
                      className="flex gap-2 items-center justify-center bg-indigo-600 shadow-md shadow-indigo-500/50 hover:bg-indigo-500 transition-all duration-300 ease-in-out text-white font-semibold rounded-md px-4 py-2">
                      <DocumentIcon className="h-4" /> Detail Unbill
                    </button>
                  </TableContent>
                  {UNBILL.tableHeader
                    .filter((item) => item !== 'id')
                    .map((nameField) => {
                      return (
                        <TableContent
                          addClassChild={
                            item[nameField] === 'mansol'
                              ? 'uppercase rounded-md bg-teal-600 text-zinc-50 font-semibold flex justify-center items-center w-fit'
                              : filterTable.indexOf(nameField) > -1
                              ? 'whitespace-pre-line'
                              : 'whitespace-nowrap'
                          }
                          key={Math.random()}>
                          {rupiahTable.indexOf(nameField) > -1
                            ? parseInt(item[nameField]) > 0
                              ? 'Rp ' + item[nameField].toLocaleString('id')
                              : item[nameField]
                            : item[nameField] === ''
                            ? '-'
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
                rowSpan={UNBILL?.tableHeader.length + 2}
                colSpan={UNBILL?.tableHeader.length + 2}>
                Tidak Ada Data
              </TableContent>
            </TableBody>
          )}
        </TableHeading>
      </div>

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
