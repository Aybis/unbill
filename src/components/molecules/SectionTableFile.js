import { DocumentAddIcon, PencilAltIcon } from '@heroicons/react/solid';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button, TableBody, TableContent, TableHeading } from '../atoms';

export default function SectionTableFile({ handlerClikUpdateStatus }) {
  const UNBILL = useSelector((state) => state.unbill);
  const USER = useSelector((state) => state.user);

  const listField = [
    'KB',
    'BA REKON',
    'BAPP',
    'BAPD',
    'BA DENDA',
    'BA PHPL',
    'SURAT PERTANGGUNG JAWABAN MUTLAK',
    'RINGKASAN PERJANJIAN',
  ];

  const OtoritasUpdate = ({ item, field, value }) => {
    switch (USER?.profile?.unit) {
      case 'OPERATION & SUPPORT':
        return field === 'LPL' || field === 'BAPLA' ? (
          value === '' || value === null ? (
            <ButtonUpdateStatus item={item} />
          ) : (
            <>
              <ButtonUpdateStatus item={item} />
              <ButtonUploadFile item={item} />
            </>
          )
        ) : (
          ''
        );

      case 'SERVICE DELIVERY':
        return field === 'BAUT' || field === 'BAST' ? (
          value === '' || value === null ? (
            <ButtonUpdateStatus item={item} />
          ) : (
            <>
              <ButtonUpdateStatus item={item} />
              <ButtonUploadFile item={item} />
            </>
          )
        ) : (
          ''
        );

      case 'HUMAN CAPITAL & GENERAL AFFAIR':
        return field === 'KL' || field === 'AMD KL' || field === 'SPK' ? (
          value === '' || value === null ? (
            <ButtonUpdateStatus item={item} />
          ) : (
            <>
              <ButtonUpdateStatus item={item} />
              <ButtonUploadFile item={item} />
            </>
          )
        ) : (
          ''
        );

      case 'GOVERNMENT, POLICE & MILITARY BUSINESS':
        return field === 'PB' || field === 'SP' || field === 'WO' ? (
          value === '' || value === null ? (
            <ButtonUpdateStatus item={item} />
          ) : (
            <>
              <ButtonUpdateStatus item={item} />
              <ButtonUploadFile item={item} />
            </>
          )
        ) : (
          ''
        );

      case 'ENTERPRISE BUSINESS':
        return field === 'PB' || field === 'SP' || field === 'WO' ? (
          value === '' || value === null ? (
            <ButtonUpdateStatus item={item} />
          ) : (
            <>
              <ButtonUpdateStatus item={item} />
              <ButtonUploadFile item={item} />
            </>
          )
        ) : (
          ''
        );

      case 'TREASURY, COLLECTION & TAX':
        return listField.indexOf(field) > -1 ? (
          value === '' || value === null ? (
            <ButtonUpdateStatus item={item} />
          ) : (
            <>
              <ButtonUpdateStatus item={item} />
              <ButtonUploadFile item={item} />
            </>
          )
        ) : (
          ''
        );

      case 'MARKETING & SALES SUPPORT':
        return listField.indexOf(field) > -1 ? (
          value === '' || value === null ? (
            <ButtonUpdateStatus item={item} />
          ) : (
            <>
              <ButtonUpdateStatus item={item} />
              <ButtonUploadFile item={item} />
            </>
          )
        ) : (
          ''
        );

      default:
        return '';
    }
  };

  const ButtonUpdateStatus = ({ item }) => {
    return (
      <Button
        handlerClick={(e) => handlerClikUpdateStatus(e, item)}
        type="edit"
        name={'update'}
        moreClass={'gap-2'}>
        <PencilAltIcon className="h-4" /> Update Status
      </Button>
    );
  };

  const ButtonUploadFile = ({ item }) => {
    return (
      <Button
        handlerClick={(e) => handlerClikUpdateStatus(e, item)}
        type="in"
        name={'upload'}
        moreClass={'gap-2'}>
        <DocumentAddIcon className="h-4" /> Upload File
      </Button>
    );
  };

  return (
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
                      <OtoritasUpdate
                        field={item.name}
                        item={item}
                        value={item.status}
                      />
                    </div>
                  </TableContent>
                </TableBody>
              ))
            : ' '}
        </TableHeading>
      )}
    </div>
  );
}
