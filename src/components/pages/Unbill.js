import { DocumentIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDataUnbill, setUnbilSelected } from '../../redux/actions/unbill';
import {
  Button,
  Loading,
  TableBody,
  TableContent,
  TableHeading,
} from '../atoms';
import { Layout } from '../includes';
import { SectionPagination } from '../molecules';

export default function Unbill() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(false);
  const UNBILL = useSelector((state) => state.unbill);

  const handlerPagination = async (item) => {
    await dispatch(fetchDataUnbill(item));
  };

  const handlerClickDetail = (item) => {
    dispatch(setUnbilSelected(item));
    history.push(`/unbill/${item.ref_key}`);
  };

  useEffect(() => {
    dispatch(fetchDataUnbill());
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!didMount) {
    return null;
  }

  return (
    <Layout titlePage={`List Unbill `}>
      <div className="relative w-full my-8 px-4 py-6 rounded-md bg-white">
        <div className="relative flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              name="search"
              defaultValue={''}
              placeholder="Search"
              className="border border-zinc-200 bg-white px-4 py-2 font-medium rounded-md shadow shadow-slate-200/50 focus:border-blue-600 transition-all duration-300 ease-in-out placeholder:opacity-40 text-sm"
            />
          </div>
        </div>

        <div className="overflow-auto relative max-w-full border-b-2 border-zinc-200">
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
                      <Button
                        handlerClick={() => handlerClickDetail(item)}
                        type={'view'}
                        moreClass={'gap-2'}>
                        <DocumentIcon className="h-4" /> Detail Unbill
                      </Button>
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
    </Layout>
  );
}
