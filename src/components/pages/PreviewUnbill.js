import { DocumentAddIcon, PencilAltIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { fetchDataPiutangByIO } from '../../redux/actions/piutang';
import {
  fetchListFileDokumen,
  setDokumenSelected,
  setStatus,
  updateKetaranganUnbill,
  updateStatusDokumen,
  uploadStatusDokumen,
  viewUnbillByIo,
} from '../../redux/actions/unbill';
import {
  Button,
  Loading,
  Modals,
  TableBody,
  TableContent,
  TableHeading,
} from '../atoms';
import { Layout } from '../includes';
import {
  FormUploadFile,
  SectionBarPreview,
  SectionFormUpdateStatusUnbill,
  SectionFormUpdateUnbill,
  SectionTablePiutang,
} from '../molecules';

export default function PreviewUnbill() {
  const { io } = useParams();
  const dispatch = useDispatch();
  const [form, setform] = useState({});
  const [formFile, setFormFile] = useState({
    file: '',
    selected: false,
    type: '',
  });
  const [statusDokumen, setstatusDokumen] = useState('');
  const [isSubmit, setisSubmit] = useState(false);
  const UNBILL = useSelector((state) => state.unbill);
  const [modalUpdateStatus, setmodalUpdateStatus] = useState(false);

  // function change input type
  const handlerChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

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

  const handlerUpdateStatus = async (event) => {
    setisSubmit(true);
    event.preventDefault();

    const result = await dispatch(
      updateStatusDokumen({
        io: UNBILL?.unbillSelected.ref_key,
        name: UNBILL?.dokumenSelected?.name?.toLowerCase() + '_status',
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

  const handlerSubmit = async (event) => {
    event.preventDefault();
    form.io = io;
    await updateKetaranganUnbill(form)
      .then((res) => {
        if (res.status === 200) {
          swal('Yeay !', res.data.message, 'success');
          dispatch(viewUnbillByIo(io));
        } else {
          swal('Oh No!', res.data.message, 'error');
        }
      })
      .catch((err) => {
        swal('Oh No!', err.data.message ?? 'Something Happened!', 'error');
      });
  };

  const handlerChangeFile = (event) => {
    setFormFile({
      ...formFile,
      file: event.target.files[0],
      selected: true,
      type: formFile.type,
    });
  };

  const handlerUploadFile = async (event) => {
    const formData = new FormData();
    event.preventDefault();
    formData.append('io', io);
    formData.append(
      'name',
      UNBILL.dokumenSelected.name.toLowerCase() + '_link',
    );
    formData.append('file', formFile.file, formFile.file.name);
    setisSubmit(true);

    try {
      const result = await dispatch(uploadStatusDokumen(formData));

      if (result.status === 200) {
        dispatch(fetchListFileDokumen(io));
        setmodalUpdateStatus(false);
        swal('Yeay!', result.message, 'success');
      } else {
        swal('Oh No!', result.message, 'error');
      }
    } catch (error) {
      swal('Oh No!', error.message ?? 'Something Happened!', 'error');
    }

    setisSubmit(false);
  };

  useEffect(() => {
    dispatch(fetchDataPiutangByIO(io));
    dispatch(viewUnbillByIo(io));
    dispatch(fetchListFileDokumen(io));
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
        {UNBILL.loading ? (
          <div className="flex justify-center items-center mt-14">
            <Loading color={'text-blue-600'} height={6} width={6} />
          </div>
        ) : (
          <SectionFormUpdateUnbill
            form={form}
            handlerChange={handlerChange}
            handlerSubmit={handlerSubmit}
          />
        )}
      </div>

      <div className="relative my-8 bg-white p-6 rounded-lg">
        <h1 className="text-zinc-800 font-semibold">
          List Piutang Berdasarkan IO{' '}
        </h1>

        <SectionTablePiutang fromPage="unbill" />
      </div>

      <div className="relative my-8 bg-white p-6 rounded-lg">
        <h1 className="text-zinc-800 font-semibold">List File Unbill</h1>

        <div className="relative mt-8 overflow-auto">
          {UNBILL.loading ? (
            ''
          ) : (
            <TableHeading
              theading={['No', 'Nama Dokumen', 'Status', 'File', 'Action']}>
              {Object.entries(UNBILL?.listDokumen).length > 0
                ? UNBILL?.listDokumen?.map((item, index) => (
                    <TableBody key={index}>
                      <TableContent>{index + 1}</TableContent>
                      <TableContent>{item.name}</TableContent>
                      <TableContent>{item.status}</TableContent>
                      <TableContent>
                        {item.link ? (
                          <a
                            rel="noreferrer"
                            title={`View dokumen ${item.name}`}
                            target={'_blank'}
                            className="text-blue-500 font-semibold hover:text-blue-600 transition-all duration-300 ease-in-out"
                            href={
                              process.env.REACT_APP_API_BILLING_STORAGE +
                              item.link.replace('public/', '')
                            }>
                            View Dokumen
                          </a>
                        ) : (
                          '-'
                        )}
                      </TableContent>
                      <TableContent>
                        <div className="flex gap-2">
                          <Button
                            handlerClick={(e) =>
                              handlerClikUpdateStatus(e, item)
                            }
                            type="edit"
                            name={'update'}
                            moreClass={'gap-2'}>
                            <PencilAltIcon className="h-4" /> Update Status
                          </Button>

                          {item.status === '' || item.status === null ? (
                            ''
                          ) : (
                            <Button
                              handlerClick={(e) =>
                                handlerClikUpdateStatus(e, item)
                              }
                              type="in"
                              name={'upload'}
                              moreClass={'gap-2'}>
                              <DocumentAddIcon className="h-4" /> Upload File
                            </Button>
                          )}
                        </div>
                      </TableContent>
                    </TableBody>
                  ))
                : ' '}
            </TableHeading>
          )}
        </div>
      </div>

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
        {formFile.type === 'upload' ? (
          <FormUploadFile
            form={formFile}
            typeFile="application/pdf"
            handlerChangeFile={handlerChangeFile}
            handlerSubmit={handlerUploadFile}
            isSubmit={isSubmit}
            status={UNBILL?.status}
          />
        ) : (
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
