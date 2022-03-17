import { ArrowLeftIcon, DocumentAddIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import {
  fetchDataPiutang,
  fetchDataTableHeaderPiutang,
  setTemporary,
  uploadFileData,
} from '../../redux/actions/piutang';
import { setStatus } from '../../redux/actions/unbill';
import { Button, Modals } from '../atoms';
import { Layout } from '../includes';
import {
  FormUploadFile,
  SectionFormSearch,
  SectionTablePiutang,
} from '../molecules';

export default function Piutang() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const UNBILL = useSelector((state) => state.unbill);
  const PIUTANG = useSelector((state) => state.piutang);
  const [keyword, setKeyword] = useState('');
  const [form, setForm] = useState({
    file: null,
    selected: false,
  });
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handlerSubmit = async (event) => {
    const formData = new FormData();
    event.preventDefault();
    formData.append('file', form.file, form.file.name);
    setIsSubmit(true);

    try {
      const result = await dispatch(uploadFileData(formData));
      if (result.status === 200) {
        dispatch(fetchDataTableHeaderPiutang());
        dispatch(fetchDataPiutang());
        swal('Yeay!', result.message, 'success');
      } else {
        swal('Oh No!', result.message, 'error');
      }
    } catch (error) {
      swal('Oh No!', error.message ?? 'Something Happened!', 'error');
    }
    setIsSubmit(false);
  };

  const handlerRemoveSearch = () => {
    setKeyword('');
    dispatch(setTemporary(keyword));
  };

  const handlerSearch = (event) => {
    event.preventDefault();
    dispatch(setTemporary(keyword));
    dispatch(fetchDataPiutang(keyword));
  };

  useEffect(() => {
    dispatch(setTemporary(''));
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
      <div className="relative w-full my-8 px-4 py-6 rounded-md bg-white overflow-auto">
        <div className="relative flex flex-col lg:flex-row lg:justify-between justify-start lg:items-center items-start mb-6 ">
          <SectionFormSearch
            keyword={keyword}
            setKeyword={setKeyword}
            handlerRemoveSearch={handlerRemoveSearch}
            handlerSearch={handlerSearch}
          />
          {!id && (
            <Button
              moreClass={'mt-4 lg:mt-0 gap-2 w-full lg:w-fit'}
              handlerClick={handlerModalUpload}>
              <DocumentAddIcon className="h-5" />
              Upload File
            </Button>
          )}
        </div>

        {PIUTANG?.loading &&
        PIUTANG?.listPiutang?.length > 0 &&
        PIUTANG?.tableHeaderPiutang?.length > 0 ? (
          <div className="relative w-full my-8 rounded-md bg-zinc-100 animate-pulse">
            <div className="inset-x-0 h-14 bg-zinc-200 rounded-md animate-pulse"></div>
            <div className="inset-x-0 h-14 bg-zinc-200 rounded-md animate-pulse mt-4"></div>
            <div className="inset-x-0 h-14 bg-zinc-200 rounded-md animate-pulse mt-2"></div>
            <div className="inset-x-0 h-14 bg-zinc-200 rounded-md animate-pulse mt-2"></div>
            <div className="inset-x-0 h-14 bg-zinc-200 rounded-md animate-pulse mt-2"></div>
            <div className="inset-x-0 h-2 bg-zinc-200 rounded-md animate-pulse mt-8"></div>
            <div className="inset-x-0 h-14 bg-zinc-200 rounded-md animate-pulse mt-2"></div>
          </div>
        ) : (
          <SectionTablePiutang />
        )}
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
