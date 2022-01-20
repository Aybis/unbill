import {
  DocumentAddIcon,
  DocumentIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import React, { useState } from 'react';
import {
  Button,
  Modals,
  TableBody,
  TableContent,
  TableHeading,
} from '../atoms';
import { Layout } from '../includes';
import { FormLop, FormUploadFile } from '../molecules';
export default function Lop() {
  const [showModal, setshowModal] = useState(false);
  const [titleModal, settitleModal] = useState('');
  const [type, settype] = useState('');
  const [isSubmit, setisSubmit] = useState(false);
  const handlerClickData = (event) => {
    setshowModal(true);
    settype(event.target.name);
    settitleModal(
      event.target.name === 'upload'
        ? 'Upload File'
        : event.target.name + ' LOP',
    );
  };

  const handlerUploadFile = (event) => {
    event.preventDefault();
    setisSubmit(true);
    setTimeout(() => {
      setisSubmit(false);
    }, 400);
  };
  return (
    <Layout titlePage={'List LOP '}>
      <div className="relative bg-white p-6 rounded-lg mt-12">
        <h1 className="text-zinc-800 font-semibold mb-8">List Data</h1>
        <div className="flex justify-between items-center">
          <Button
            handlerClick={handlerClickData}
            name={'create'}
            moreClass={'gap-2'}>
            <DocumentAddIcon className="h-5" /> Create LOP
          </Button>

          <Button
            handlerClick={handlerClickData}
            name={'upload'}
            moreClass={'gap-2'}>
            <DocumentIcon className="h-5" /> Upload File
          </Button>
        </div>
        <div className="relative mt-4 overflow-auto">
          <TableHeading theading={['No', 'Deskripsi', 'Unit Bisnis', 'Action']}>
            <TableBody>
              <TableContent>1</TableContent>
              <TableContent>Pembelian Macbook Pro 16inch M1 Max</TableContent>
              <TableContent>Operation & Support</TableContent>
              <TableContent>
                <div className="flex flex-col justify-start gap-2 w-fit">
                  <Button
                    name={'update'}
                    moreClass={'gap-2'}
                    handlerClick={handlerClickData}>
                    <PencilAltIcon className="h-5" /> Update LOP
                  </Button>
                  <Button name={'delete'} type={'out'} moreClass={'gap-2'}>
                    <TrashIcon className="h-5" /> Delete LOP
                  </Button>
                </div>
              </TableContent>
            </TableBody>
          </TableHeading>
        </div>
      </div>
      <Modals open={showModal} handlerClose={setshowModal} title={titleModal}>
        {type === 'upload' ? (
          <FormUploadFile
            isSubmit={isSubmit}
            handlerSubmit={handlerUploadFile}
          />
        ) : (
          <FormLop />
        )}
      </Modals>
    </Layout>
  );
}
