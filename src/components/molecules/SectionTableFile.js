import {
  ClipboardIcon,
  DocumentAddIcon,
  DocumentIcon,
  PaperAirplaneIcon,
  PencilAltIcon,
} from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { convertDate } from '../../helpers/ConvertDate';
import {
  deleteFile,
  fetchListFileDokumen,
  sendNotifFollowUp,
  setStatus,
} from '../../redux/actions/unbill';
import {
  Button,
  Feed,
  Modals,
  TableBody,
  TableContent,
  TableHeading,
} from '../atoms';

export default function SectionTableFile({ handlerClikUpdateStatus, io }) {
  const UNBILL = useSelector((state) => state.unbill);
  const USER = useSelector((state) => state.user);
  const [showModal, setshowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [loadingNotif, setloadingNotif] = useState(false);
  const [fileSelect, setfileSelect] = useState('');
  const [dataSelected, setdataSelected] = useState({
    type: '',
    name: '',
    dataFile: {},
  });
  const dispatch = useDispatch();

  const handlerClickDetailFile = (event, item, data) => {
    setshowModal(true);
    setdataSelected({
      type: event.target.name,
      name: item.name,
      dataFile: data,
    });
  };

  const handlerDeleteFile = async (item) => {
    setfileSelect(item);
    setloading(true);
    try {
      const result = await dispatch(
        deleteFile({
          io: io,
          name: dataSelected.name.toLowerCase().split(' ').join('_') + '_link',
          filename: item,
        }),
      );

      if (result.status === 200) {
        setloading(false);
        dispatch(fetchListFileDokumen(io));
        dispatch(setStatus(''));
        swal('Yeay!', result.message ?? 'Berhasil Delete File', 'success');
      } else {
        setloading(false);
        swal('Oh No!', result.message, 'error');
      }
    } catch (error) {
      setloading(false);
      swal('Oh No!', error.message ?? 'Something Happened!', 'error');
    }
  };

  const handlerNotifikasiFollowUp = async (event) => {
    setloadingNotif(true);
    let userId = USER?.profile?.id;
    let getNameUnit = JSON.parse(UNBILL?.unbillSelected?.follow_up).pop().value;
    let getListDokumen = UNBILL?.listDokumen
      ?.filter((item) => item.status === 'OK')
      .map((dokumen) => {
        return dokumen.name;
      });
    let getNameOfProject = UNBILL?.unbillSelected?.deskripsi_project;

    let data = {
      io: io,
      unit_name: getNameUnit,
      sender_id: userId,
      status_dokumen: getListDokumen.toString(),
      nama_project: getNameOfProject,
      type: event.target.name,
    };

    try {
      const result = await dispatch(sendNotifFollowUp(data));
      if (result.status === 200) {
        setloadingNotif(false);
        swal('Yeay!', result.data, 'success');
      } else {
        setloadingNotif(false);
        swal('Oh No!', result?.data?.message ?? 'Something Happened!', 'error');
      }
    } catch (error) {
      swal('Oh No!', error ?? 'Something Happened!', 'error');
      setloadingNotif(false);
    }
  };

  return UNBILL?.loading && UNBILL?.listDokumen?.length > 0 ? (
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
    <div className="relative mt-8 ">
      <div className=" my-4 sticky top-0">
        <Button
          isSubmit={loadingNotif}
          handlerClick={(event) => handlerNotifikasiFollowUp(event)}
          type="out"
          name={
            USER?.profile?.unit === 'TREASURY, COLLECTION & TAX'
              ? 'return'
              : 'followup'
          }
          moreClass={'gap-2'}>
          <PaperAirplaneIcon className="h-5 rotate-45" />
          {USER?.profile?.unit === 'TREASURY, COLLECTION & TAX'
            ? 'Return'
            : 'Follow Up'}
        </Button>
      </div>
      <div
        className="relative overflow-auto"
        style={{
          maxHeight: '40rem',
        }}>
        <TableHeading
          theading={[
            'No',
            'Nama Dokumen',
            'Status',
            'History Upload',
            'File',
            'Action',
          ]}>
          {Object.entries(UNBILL?.listDokumen)?.length > 0 ? (
            UNBILL?.listDokumen?.map((item, index) => (
              <TableBody key={index}>
                <TableContent>{index + 1}</TableContent>
                <TableContent>{item.name}</TableContent>
                <TableContent>{item.status}</TableContent>
                <TableContent>
                  {item.link === null || item.link === '[]' ? (
                    ''
                  ) : (
                    <Button
                      name={'history'}
                      type="view"
                      handlerClick={(e) =>
                        handlerClickDetailFile(e, item, JSON.parse(item.link))
                      }
                      moreClass={'gap-2'}>
                      <ClipboardIcon className="h-5" />
                      View History
                    </Button>
                  )}
                </TableContent>
                <TableContent>
                  {item.link === null || item.link === '[]' ? (
                    ''
                  ) : (
                    <Button
                      type="view"
                      name={'view_list'}
                      handlerClick={(e) =>
                        handlerClickDetailFile(e, item, JSON.parse(item.link))
                      }
                      moreClass={'gap-2'}>
                      <DocumentIcon className="h-5" />
                      View File
                    </Button>
                  )}
                </TableContent>
                <TableContent>
                  <div className="flex gap-2">
                    <Button
                      handlerClick={(e) => handlerClikUpdateStatus(e, item)}
                      type="edit"
                      name={'update'}
                      moreClass={'gap-2'}>
                      <PencilAltIcon className="h-4" /> Update Status
                    </Button>
                    {item.status === '' || item.status === null ? (
                      ''
                    ) : (
                      <Button
                        handlerClick={(e) => handlerClikUpdateStatus(e, item)}
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
          ) : (
            <TableBody>
              <TableContent rowSpan={6} colSpan={6}></TableContent>
            </TableBody>
          )}
        </TableHeading>
      </div>

      <Modals
        open={showModal}
        handlerClose={setshowModal}
        dontClose={loading}
        addClass={'max-w-5xl'}
        title={`List File ${dataSelected.name}`}>
        <div
          className="relative mt-6 overflow-auto"
          style={{ maxHeight: '40rem' }}>
          {dataSelected.type === 'history' ? (
            Object.entries(dataSelected?.dataFile).length > 0 ? (
              dataSelected?.dataFile?.map((item, index) => (
                <Feed
                  key={index + 1}
                  date={item.date}
                  name={item.user}
                  comment={item.value}
                  dokumenName={item.file_name}
                  type="file"
                  dokumen={dataSelected.name}
                />
              ))
            ) : (
              ''
            )
          ) : (
            <TableHeading
              theading={['No', 'Link', 'Nama', 'Tanggal', 'Action']}>
              {Object.entries(dataSelected?.dataFile).length > 0
                ? dataSelected?.dataFile?.map((item, index) => (
                    <TableBody key={index + 1}>
                      <TableContent>{index + 1} </TableContent>
                      <TableContent addClassRow={'whitespace-normal'}>
                        <a
                          rel="noreferrer"
                          title={`View dokumen ${
                            item.file_name ?? dataSelected.name
                          }`}
                          target={'_blank'}
                          className="text-blue-500 font-semibold hover:text-blue-600 transition-all duration-300 ease-in-out"
                          href={
                            process.env.REACT_APP_API_BILLING_STORAGE +
                            item.value.replace('public/', '')
                          }>
                          {item.file_name ?? 'View Dokumen'}
                        </a>{' '}
                      </TableContent>
                      <TableContent>{item.user} </TableContent>
                      <TableContent>
                        {convertDate('tanggalHari', item.date)}{' '}
                      </TableContent>
                      <TableContent>
                        {' '}
                        <Button
                          isSubmit={loading && fileSelect === item.value}
                          handlerClick={() => handlerDeleteFile(item.value)}
                          type="out">
                          Delete
                        </Button>{' '}
                      </TableContent>
                    </TableBody>
                  ))
                : ''}
            </TableHeading>
          )}
        </div>
      </Modals>
    </div>
  );
}
