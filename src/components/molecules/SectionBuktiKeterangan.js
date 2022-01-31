import { DocumentAddIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { FormUploadFile } from '.';
import { convertDate } from '../../helpers/ConvertDate';
import {
  fetchListBuktiSerahTerima,
  setBuktiSerahTerimaSelected,
  setStatus,
  uploadBuktiSerahTerima,
} from '../../redux/actions/unbill';
import { Button, Modals } from '../atoms';

export default function SectionBuktiKeterangan() {
  const { io } = useParams();
  const USER = useSelector((state) => state.user);
  const UNBILL = useSelector((state) => state.unbill);

  const [showModal, setshowModal] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const dispatch = useDispatch();
  const [dataSelected, setdataSelected] = useState({});
  const [keterangan, setketerangan] = useState('');

  const [formFile, setFormFile] = useState({
    file: '',
    selected: false,
    type: '',
  });

  const handlerModal = (event, item) => {
    setketerangan('');
    setdataSelected({
      name: event.target.name ?? item.name,
    });
    dispatch(setBuktiSerahTerimaSelected(item));
    console.log(item);
    setshowModal(true);
  };

  const handlerChangeFile = (event) => {
    setFormFile({
      ...formFile,
      file: event.target.files[0],
      selected: true,
      type: formFile.type,
    });
  };

  const handlerUploadBuktiSerahTerima = async (event) => {
    const formData = new FormData();
    event.preventDefault();
    setisSubmit(true);
    formData.append('io', io);
    formData.append('file', formFile.file, formFile.file.name);
    formData.append('nama', USER?.profile?.name);
    formData.append('unit', USER?.profile?.unit);
    formData.append('user_id', USER?.profile?.id);
    formData.append('keterangan', keterangan);
    try {
      const result = await dispatch(uploadBuktiSerahTerima(formData));

      if (result.status === 200) {
        dispatch(setStatus(''));
        setdataSelected({
          name: '',
          selected: '',
          type: '',
        });
        swal('Yeay!', result.message, 'success');
      } else {
        swal('Oh No!', result.message, 'error');
      }
      setisSubmit(false);
    } catch (error) {
      swal('Oh No!', error.message ?? 'Something Happened!', 'error');
      setisSubmit(false);
    }
  };

  useEffect(() => {
    dispatch(setStatus(''));
    dispatch(fetchListBuktiSerahTerima(io));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <div className="relative my-8 bg-white p-6 rounded-lg">
        <h1 className="text-zinc-800 font-semibold mb-8">
          Bukti Keterangan Serah Terima{' '}
        </h1>
        <div className="relative">
          <Button
            name={'image'}
            handlerClick={handlerModal}
            moreClass={'gap-2'}>
            <DocumentAddIcon className="h-5 text-zinc-50" /> Upload Bukti Serah
            Terima
          </Button>
        </div>

        <div className="relative mt-8">
          <div className="grid grid-cols-2 2xl:grid-cols-4 gap-4">
            {UNBILL.listBuktiSerahTerima.length > 0
              ? UNBILL.listBuktiSerahTerima.map((item, index) => (
                  <div
                    key={Math.random()}
                    name="detail"
                    onClick={(e) => handlerModal(e, item)}
                    className="flex gap-3 p-4 border border-zinc-200 rounded-md hover:bg-zinc-100 transition-all duration-300 ease-in-out cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-zinc-800 capitalize">
                        {item.nama.toLowerCase() ?? ''}
                      </p>
                      <p className="text-xs text-zinc-500 group-hover:text-zinc-50">
                        {item.keterangan}
                      </p>
                      <p className="text-xs font-light text-zinc-600 text-right mt-2">
                        {convertDate('tanggalHari', item.created_at)} -{' '}
                        {convertDate('jamAM', item.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </div>
      <Modals
        handlerClose={setshowModal}
        open={showModal}
        dontClose={isSubmit}
        title={
          dataSelected.name === 'image'
            ? 'Upload Bukti Serah Terima'
            : 'Detail Bukti Serah Terima'
        }>
        {dataSelected.name === 'image' ? (
          <FormUploadFile
            form={formFile}
            valueInput={keterangan}
            nameInput="keterangan"
            handlerChangInput={(event) => setketerangan(event.target.value)}
            typeForm="image"
            handlerChangeFile={handlerChangeFile}
            handlerSubmit={handlerUploadBuktiSerahTerima}
            typeFile="image/png, image/jpeg"
            isSubmit={isSubmit}
            status={UNBILL.status}
          />
        ) : (
          <div className="relative">
            <img
              src={
                process.env.REACT_APP_API_BILLING_STORAGE +
                UNBILL?.buktiSerahTerimaSelected?.link?.replace('public/', '')
              }
              alt=""
              className="max-h-96 w-full rounded-md border border-zinc-200"
            />

            <div className="flex flex-col gap-1 text-left mt-6">
              <p className="font-medium text-zinc-800 capitalize">
                {UNBILL?.buktiSerahTerimaSelected?.nama?.toLowerCase()}
              </p>
              <p className="text-sm text-zinc-500 group-hover:text-zinc-50">
                {UNBILL?.buktiSerahTerimaSelected?.keterangan?.toLowerCase()}
              </p>
              <p className="text-xs font-light text-zinc-400 text-right mt-6">
                {convertDate(
                  'tanggalHari',
                  UNBILL?.buktiSerahTerimaSelected?.created_at,
                )}{' '}
                -{' '}
                {convertDate(
                  'jamAM',
                  UNBILL?.buktiSerahTerimaSelected?.created_at,
                )}
              </p>
            </div>
          </div>
        )}
      </Modals>
    </>
  );
}
