import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { fetchDataPiutangByIO } from '../../redux/actions/piutang';
import {
  fetchListFileDokumen,
  fetchListKategori,
  fetchListKendala,
  setDokumenSelected,
  setStatus,
  setTemporary,
  updateStatusDokumen,
  uploadStatusDokumen,
  viewUnbillByIo,
} from '../../redux/actions/unbill';
import { fetchListUnit } from '../../redux/actions/user';
import { Modals } from '../atoms';
import { Layout } from '../includes';
import {
  FormUploadFile,
  SectionBarPreview,
  SectionBuktiKeterangan,
  SectionFormSearch,
  SectionFormUpdateStatusUnbill,
  SectionFormUpdateUnbill,
  SectionKeteranganUpdate,
  SectionTableFile,
  SectionTableInvoice,
  SectionTablePiutang,
} from '../molecules';

export default function PreviewUnbill() {
  const { io } = useParams();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [isSubmit, setisSubmit] = useState(false);
  const UNBILL = useSelector((state) => state.unbill);
  const USER = useSelector((state) => state.user);
  const [statusDokumen, setstatusDokumen] = useState('');
  const [modalUpdateStatus, setmodalUpdateStatus] = useState(false);
  const [formFile, setFormFile] = useState({
    file: '',
    selected: false,
    type: '',
  });
  const handlerClikUpdateStatus = (event, item) => {
    dispatch(setStatus(''));
    dispatch(
      setDokumenSelected({
        name: item.name,
        value: item.status,
      }),
    );
    setmodalUpdateStatus(true);
    setFormFile({
      file: null,
      selected: false,
      type: event.target.name,
    });
  };

  const handlerUpdateStatus = async (event) => {
    setisSubmit(true);
    event.preventDefault();

    const result = await dispatch(
      updateStatusDokumen({
        io: UNBILL?.unbillSelected.ref_key,
        name:
          UNBILL?.dokumenSelected?.name?.toLowerCase().split(' ').join('_') +
          '_status',
        value: statusDokumen,
      }),
    );

    if (result.status === 200) {
      dispatch(fetchListFileDokumen(UNBILL?.unbillSelected.ref_key));
      setmodalUpdateStatus(false);
      swal('Yeay!', result.message, 'success');
    } else {
      swal('Oh No!', result.message ?? 'Something Happned!', 'error');
    }
    setisSubmit(false);
  };

  const handlerChangeFile = (event) => {
    setFormFile({
      ...formFile,
      file: event.target.files,
      selected: true,
      type: formFile.type,
    });
  };

  const handlerUploadFile = async (event) => {
    const formData = new FormData();
    event.preventDefault();
    formData.append('io', io);
    formData.append('user', USER?.profile?.name);
    formData.append('user_id', USER?.profile?.id);
    formData.append(
      'name',
      UNBILL.dokumenSelected.name.toLowerCase().split(' ').join('_') + '_link',
    );
    for (let i = 0; i < formFile.file.length; i++) {
      formData.append(`files[${i}]`, formFile.file[i]);
    }
    setisSubmit(true);

    try {
      const result = await dispatch(uploadStatusDokumen(formData));

      if (result.status === 200) {
        dispatch(fetchListFileDokumen(io));
        setmodalUpdateStatus(false);
        dispatch(setStatus(''));
        swal('Yeay!', result.message, 'success');
      } else {
        swal('Oh No!', result.message, 'error');
      }
    } catch (error) {
      swal('Oh No!', error.message ?? 'Something Happened!', 'error');
    }
    setisSubmit(false);
  };

  const handlerRemoveSearch = () => {
    setKeyword('');
    dispatch(setTemporary(keyword));
  };

  const handlerSearch = (event) => {
    event.preventDefault();
    dispatch(setTemporary(keyword));
    dispatch(fetchDataPiutangByIO(io, keyword));
  };

  useEffect(() => {
    dispatch(setTemporary(''));
    dispatch(fetchDataPiutangByIO(io));
    dispatch(viewUnbillByIo(io));
    dispatch(fetchListFileDokumen(io));

    dispatch(fetchListUnit());
    dispatch(fetchListKendala());
    dispatch(fetchListKategori());
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
        <SectionFormUpdateUnbill />
      </div>

      {/* List Detail Piutang */}
      <div className="relative my-8 bg-white p-6 rounded-lg">
        <h1 className="text-zinc-800 font-semibold mb-8">
          List Piutang Berdasarkan IO{' '}
        </h1>
        <SectionFormSearch
          keyword={keyword}
          setKeyword={setKeyword}
          handlerRemoveSearch={handlerRemoveSearch}
          handlerSearch={handlerSearch}
        />
        <SectionTablePiutang fromPage="unbill" />
      </div>

      {/* List Detail Invoice */}
      <div className="relative my-8 bg-white p-6 rounded-lg">
        <h1 className="text-zinc-800 font-semibold mb-8">
          List Invoice Berdasarkan IO{' '}
        </h1>
        <SectionTableInvoice />
      </div>

      {/* List Catatan  */}
      <div className="relative my-8 bg-white rounded-lg p-6">
        <h1 className="text-zinc-800 font-semibold">Catatan</h1>
        <SectionKeteranganUpdate />
      </div>

      {/* List File */}
      <div className="relative my-8 bg-white p-6 rounded-lg">
        <h1 className="text-zinc-800 font-semibold">List File Unbill</h1>

        <div className="mb-4">
          <SectionTableFile
            handlerClikUpdateStatus={handlerClikUpdateStatus}
            io={io}
          />
        </div>
      </div>

      {/* List Bukti Keterangan */}
      <SectionBuktiKeterangan />

      <Modals
        open={modalUpdateStatus}
        handlerClose={setmodalUpdateStatus}
        title={`Update Status Dokumen ${
          UNBILL?.dokumenSelected?.name?.length > 1
            ? UNBILL?.dokumenSelected?.name
                .split('_')
                .join(' ')
                .split('status')
                .join('')
                .toUpperCase()
            : ''
        }`}>
        {formFile.type === 'upload' && (
          <FormUploadFile
            form={formFile}
            typeFile="application/pdf"
            mutltiple={true}
            handlerChangeFile={handlerChangeFile}
            handlerSubmit={handlerUploadFile}
            isSubmit={isSubmit}
            status={UNBILL?.status}
          />
        )}
        {formFile.type === 'update' && (
          <SectionFormUpdateStatusUnbill
            handlerModal={setmodalUpdateStatus}
            handlerSubmit={handlerUpdateStatus}
            setStatusValue={setstatusDokumen}
            isSubmit={isSubmit}
          />
        )}
      </Modals>
    </Layout>
  );
}
