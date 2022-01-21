import { DocumentAddIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import {
  fetchDataPiutangByIO,
  setPiutangSelected,
  setTypePage,
} from '../../redux/actions/piutang';
import { Button, Input, TableBody, TableContent, TableHeading } from '../atoms';
import { Layout } from '../includes';
import { SectionBarPreview, SectionTablePiutang } from '../molecules';

export default function PreviewUnbill() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isUpdate, setisUpdate] = useState(false);
  const [form, setform] = useState({});
  const UNBILL = useSelector((state) => state.unbill);

  // function change input type
  const handlerChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handlerClickDetail = (item) => {
    dispatch(setPiutangSelected(item));
    dispatch(setTypePage('preview'));

    history.push(`/preview-piutang/${item.id}`);
  };

  const handlerPagination = async (item) => {
    await dispatch(fetchDataPiutangByIO(UNBILL?.unbillSelected?.ref_key, item));
  };

  // collect variable name from data selected
  const getListName = () => {
    let data = {};
    Object.entries(UNBILL.unbillSelected).map((item) => {
      data[item[0]] = item[1];
      return data;
    });
    // insert name of input to variable form
    setform(data);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    swal(
      'Huhuuu!',
      'Nanti Yah Developer Masih bingung sama prosesnya :)',
      'info',
    );
  };

  useEffect(() => {
    dispatch(fetchDataPiutangByIO(UNBILL?.unbillSelected?.ref_key));
    getListName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout titlePage={'Preview Unbill'}>
      <SectionBarPreview
        name={UNBILL.unbillSelected.ref_key}
        subname={UNBILL.unbillSelected.deskripsi_project}
      />

      {/* List Detail Unbill */}
      <div className="relative my-8 bg-white rounded-lg p-6">
        <h1 className="text-zinc-800 font-semibold">Detail Unbill</h1>
        <form onSubmit={handlerSubmit} className="relative mt-8">
          <div className="grid grid-cols-3 gap-6">
            {Object.entries(UNBILL.unbillSelected)
              .filter((item) => item[0] !== 'id')
              .map((item) => {
                return (
                  <Input
                    key={item[0]}
                    addClassLabel={'uppercase font-semibold text-zinc-800'}
                    label={item[0]}
                    value={form[item[0]] ?? ''}
                    name={item[0]}
                    required={false}
                    handlerChange={(e) => handlerChange(e)}
                    readonly={isUpdate ? false : true}
                    disabled={isUpdate ? false : true}
                  />
                );
              })}
          </div>
          {isUpdate && (
            <div className="mt-8 flex gap-4">
              <Button type="in">Update </Button>
              <Button type="out" handlerClick={() => setisUpdate(false)}>
                Cancel{' '}
              </Button>
            </div>
          )}
        </form>

        {!isUpdate && (
          <div className="mt-8">
            <Button handlerClick={() => setisUpdate(true)} type="edit">
              Apakah Anda Ingin Update Unbill ?{' '}
            </Button>
          </div>
        )}
      </div>

      <div className="relative my-8 bg-white p-6 rounded-lg">
        <h1 className="text-zinc-800 font-semibold">
          List Piutang Berdasarkan IO{' '}
        </h1>

        <SectionTablePiutang
          handlerClickDetail={handlerClickDetail}
          handlerPagination={handlerPagination}
        />
      </div>

      <div className="relative my-8 bg-white p-6 rounded-lg">
        <h1 className="text-zinc-800 font-semibold">List File Unbill</h1>

        <div className="relative mt-8 overflow-auto">
          <TableHeading
            theading={['No', 'Nama Dokumen', 'Status', 'File', 'Action']}>
            {Object.entries(UNBILL?.unbillSelected)
              .filter((item) => item[0].search('status') > -1)
              .map((name, index) => {
                return (
                  <TableBody key={name}>
                    <TableContent>{index + 1}</TableContent>
                    <TableContent addClassChild={'uppercase'}>
                      {name[0].replace(/_/g, ' ')}
                    </TableContent>
                    <TableContent>
                      {name[1] === '' ? '-' : name[1]}
                    </TableContent>
                    <TableContent>
                      {name[1] === '' ? 'Belum Ada File' : 'Tidak Perlu'}
                    </TableContent>
                    <TableContent>
                      <Button
                        handlerClick={() => {
                          swal(
                            'Huhuuu!',
                            'Nanti Yah Developer Masih bingung sama prosesnya :)',
                            'info',
                          );
                        }}
                        type="in"
                        moreClass={'gap-2'}>
                        <DocumentAddIcon className="h-4" /> Upload File
                      </Button>
                    </TableContent>
                  </TableBody>
                );
              })}
          </TableHeading>
        </div>
      </div>
    </Layout>
  );
}
