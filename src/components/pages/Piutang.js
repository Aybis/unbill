import { ArrowLeftIcon, DocumentAddIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import {
  fetchDataPiutang,
  fetchDataTableHeaderPiutang,
  setPiutangSelected,
  setTypePage,
  uploadFileData,
} from '../../redux/actions/piutang';
import { setStatus } from '../../redux/actions/unbill';
import { Modals } from '../atoms';
import { Layout } from '../includes';
import { FormUploadFile, SectionTablePiutang } from '../molecules';

export default function Piutang() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const UNBILL = useSelector((state) => state.unbill);
  const PIUTANG = useSelector((state) => state.piutang);
  const [form, setForm] = useState({
    file: null,
    selected: false,
  });
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlerClickDetail = (item) => {
    dispatch(setPiutangSelected(item));
    dispatch(setTypePage('preview'));

    history.push(`/preview-piutang/${item.id}`);
  };

  const handlerChangeFile = (event) => {
    setForm({
      file: event.target.files[0],
      selected: true,
    });
  };

  const handlerModalUpload = () => {
    setShowModal(true);
    dispatch(setStatus(''));
    setForm({
      file: null,
      selected: false,
    });
  };

  const handlerPagination = async (item) => {
    await dispatch(fetchDataPiutang(item));
  };

  const handlerSubmit = async (event) => {
    const formData = new FormData();
    event.preventDefault();
    formData.append('file', form.file, form.file.name);
    setIsSubmit(true);

    try {
      const result = await dispatch(uploadFileData(formData));
      if (result.status === 200) {
        swal('Yeay!', result.message, 'success');
      } else {
        swal('Oh No!', result.message, 'error');
      }
    } catch (error) {
      swal('Oh No!', error.message ?? 'Something Happened!', 'error');
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    dispatch(fetchDataTableHeaderPiutang());
    dispatch(fetchDataPiutang());
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
    <Layout titlePage={`List Piutang `}>
      {id && (
        <>
          <span
            onClick={() => history.goBack()}
            className="relative cursor-pointer flex w-fit mt-4 gap-2 pb-1 items-center hover:border-zinc-500 border-b-2 border-transparent transition-all duration-300 ease-in-out">
            <ArrowLeftIcon className="text-zinc-800 h-4" />
            <span className="text-sm font-medium">Kembali</span>
          </span>
          <div className="relative mt-8 p-4 rounded-md text-white flex justify-center items-center bg-blue-500 shadow-lg shadow-blue-400/50">
            <h1 className="text-xl font-semibold">
              {UNBILL.unbillSelected.id} -{' '}
              {UNBILL.unbillSelected.first_name +
                ' ' +
                UNBILL.unbillSelected.last_name}
            </h1>
          </div>
        </>
      )}
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
          {!id && (
            <button
              onClick={handlerModalUpload}
              className="text-sm rounded-md shadow-md shadow-blue-500/50 bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out px-4 py-2 text-white font-semibold flex justify-center items-center gap-2">
              <DocumentAddIcon className="h-5" />
              Upload File
            </button>
          )}
        </div>

        <SectionTablePiutang
          handlerClickDetail={handlerClickDetail}
          handlerPagination={handlerPagination}
        />
      </div>

      <Modals
        open={showModal}
        dontClose={isSubmit}
        handlerClose={setShowModal}
        title={'Upload File Data Piutang'}
        position="center">
        <FormUploadFile
          form={form}
          handlerChangeFile={handlerChangeFile}
          handlerSubmit={handlerSubmit}
          isSubmit={isSubmit}
          status={PIUTANG.status}
        />
      </Modals>
    </Layout>
  );
}
