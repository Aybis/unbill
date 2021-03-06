import {
  DocumentAddIcon,
  DocumentIcon,
  PencilAltIcon,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import {
  fetchDataLop,
  setLopSelected,
  setStatus,
  setTemporary,
  setTypeForm,
  uploadFileLop,
} from '../../redux/actions/lop';
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
  FormLop,
  FormUploadFile,
  SectionFormSearch,
  SectionPagination,
} from '../molecules';

export default function Lop() {
  const LOP = useSelector((state) => state.lop);
  const USER = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [type, settype] = useState('');
  const [keyword, setKeyword] = useState('');
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [titleModal, settitleModal] = useState('');
  const [showModal, setshowModal] = useState(false);
  const [form, setForm] = useState({
    file: null,
    selected: false,
  });
  const isAdmin = ['masdeiri', 'oktriana', 'asrie', 'abdul.muchtar'];

  const handlerChangeFile = (event) => {
    setForm({
      file: event.target.files[0],
      selected: true,
    });
  };

  const handlerClickData = (event, item) => {
    setshowModal(true);
    settype(event.target.name);

    dispatch(setStatus(''));
    dispatch(setTypeForm(event.target.name));
    dispatch(setLopSelected(item));

    setForm({
      file: null,
      selected: false,
    });

    settitleModal(
      event.target.name === 'upload'
        ? 'Upload File'
        : event.target.name + ' LOP',
    );
  };

  const handlerClickPagination = (item) => {
    dispatch(fetchDataLop(LOP.temporary, item));
  };

  const handlerUploadFile = async (event) => {
    const formData = new FormData();
    event.preventDefault();
    formData.append('file', form.file, form.file.name);
    setisSubmit(true);

    try {
      const result = await dispatch(uploadFileLop(formData));

      if (result.status === 200) {
        dispatch(fetchDataLop(LOP?.allPage?.current_page));
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
    dispatch(fetchDataLop(keyword));
  };

  useEffect(() => {
    dispatch(setTemporary(''));
    dispatch(fetchDataLop());
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
    <Layout titlePage={'List LOP '}>
      <div className="relative bg-white p-6 rounded-lg mt-12">
        <h1 className="text-zinc-800 font-semibold mb-8">List Data</h1>
        <div className="flex flex-col lg:flex-row justify-between lg:items-center items-start">
          <SectionFormSearch
            keyword={keyword}
            setKeyword={setKeyword}
            handlerRemoveSearch={handlerRemoveSearch}
            handlerSearch={handlerSearch}
          />
          {isAdmin.includes(USER?.profile?.username) && (
            <div className="relative flex flex-col lg:flex-row mt-4 gap-4 w-full lg:w-fit">
              <Button
                handlerClick={handlerClickData}
                name={'create'}
                moreClass={'gap-2 w-full lg:w-fit'}>
                <DocumentAddIcon className="h-5" /> Tambah LOP
              </Button>

              <Button
                handlerClick={handlerClickData}
                name={'upload'}
                moreClass={'gap-2 w-full lg:w-fit'}>
                <DocumentIcon className="h-5" /> Upload File
              </Button>
            </div>
          )}
        </div>
        {LOP?.loading ? (
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
          <div
            className="relative mt-6 overflow-auto border-b-2 border-zinc-200"
            style={{
              maxHeight: '40rem',
            }}>
            <TableHeading
              theading={['No', 'No. IO', 'Deskripsi', 'Unit Bisnis', ' ']}>
              {LOP.loading ? (
                <TableBody>
                  <TableContent colSpan={5} rowSpan={5}>
                    <div className="flex justify-center items-center mt-14">
                      <Loading color={'text-blue-600'} height={6} width={6} />
                    </div>
                  </TableContent>
                </TableBody>
              ) : LOP?.listLop?.length > 0 ? (
                LOP?.listLop?.map((item) => (
                  <TableBody key={item.id}>
                    <TableContent>{item.id}</TableContent>
                    <TableContent>{item.io}</TableContent>
                    <TableContent addClassChild={'whitespace-pre-line'}>
                      {item.deskripsi_project}
                    </TableContent>
                    <TableContent>{item.unit}</TableContent>
                    <TableContent>
                      <div className="flex gap-2">
                        <Button
                          type={'edit'}
                          name={'update'}
                          moreClass={'gap-2'}
                          handlerClick={(e) => handlerClickData(e, item)}>
                          <PencilAltIcon className="h-5" />
                          Edit
                        </Button>
                      </div>
                    </TableContent>
                  </TableBody>
                ))
              ) : (
                <TableBody>
                  <TableContent colSpan={5} rowSpan={5}>
                    Tidak Ada Data
                  </TableContent>
                </TableBody>
              )}
            </TableHeading>
          </div>
        )}
        {LOP?.listLop?.length > 0 ? (
          <SectionPagination
            currentPage={LOP?.allPage?.current_page}
            perPage={LOP?.allPage?.per_page}
            total={LOP?.allPage?.total}
            lastPage={LOP?.allPage?.last_page}
            handlerClick={handlerClickPagination}
          />
        ) : (
          ' '
        )}
      </div>
      <Modals
        open={showModal}
        handlerClose={setshowModal}
        title={titleModal}
        dontClose={false}>
        {type === 'upload' ? (
          <FormUploadFile
            form={form}
            handlerChangeFile={handlerChangeFile}
            handlerSubmit={handlerUploadFile}
            isSubmit={isSubmit}
            status={LOP?.status}
          />
        ) : (
          <FormLop handlerClose={setshowModal} />
        )}
      </Modals>
    </Layout>
  );
}
