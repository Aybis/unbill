import { PencilAltIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { SectionDropdownKeteranganUpdate } from '.';
import {
  updateKetaranganUnbill,
  viewUnbillByIo,
} from '../../redux/actions/unbill';
import {
  Button,
  Modals,
  SwitchButton,
  TableBody,
  TableContent,
  TableHeading,
  Textarea,
} from '../atoms';

export default function SectionKeteranganUpdate() {
  const { io } = useParams();
  const dispatch = useDispatch();
  const [form, setform] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [selectKeterangan, setselectKeterangan] = useState({
    name: '',
    value: '',
  });
  const [showModal, setShowModal] = useState(false);

  const fieldKeterangan = [
    'follow_up',
    'kendala_unbilled',
    'kendala_dokumen',
    'kategori',
    'catatan_bilco',
    'catatan_operation',
    'catatan_sdv',
    'catatan_ubis',
    'keterangan',
  ];

  const UNBILL = useSelector((state) => state.unbill);
  const USER = useSelector((state) => state.user);

  const handlerUpdateKeterangan = (item) => {
    console.log(item);
    setselectKeterangan({
      name: item[0],
      value: item[1],
    });
    setShowModal(true);
  };

  // function change input type
  const handlerChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
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

  const OtoritasUpdate = ({ item, field }) => {
    switch (USER?.profile?.unit) {
      case 'GOVERNMENT, POLICE & MILITARY BUSINESS':
        return field.indexOf('catatan') < 0 ? (
          <ButtonUpdate item={item} field={field} />
        ) : (
          field === 'catatan_ubis' && <ButtonUpdate item={item} />
        );

      case 'ENTERPRISE BUSINESS':
        return field.indexOf('catatan') < 0 ? (
          <ButtonUpdate item={item} field={field} />
        ) : (
          field === 'catatan_ubis' && <ButtonUpdate item={item} />
        );

      case 'SERVICE DELIVERY':
        return field.indexOf('catatan') < 0 ? (
          <ButtonUpdate item={item} field={field} />
        ) : (
          field === 'catatan_sdv' && <ButtonUpdate item={item} />
        );

      case 'OPERATION & SUPPORT':
        return field.indexOf('catatan') < 0 ? (
          <ButtonUpdate item={item} field={field} />
        ) : (
          field === 'catatan_operation' && <ButtonUpdate item={item} />
        );

      case 'MARKETING & SALES SUPPORT':
        return field.indexOf('catatan') < 0 ? (
          <ButtonUpdate item={item} field={field} />
        ) : field === 'catatan_sdv' || field === 'catatan_operation' ? (
          <ButtonUpdate item={item} />
        ) : (
          ''
        );

      case 'TREASURY, COLLECTION & TAX':
        return field.indexOf('catatan') < 0 ? (
          <ButtonUpdate item={item} field={field} />
        ) : (
          field === 'catatan_bilco' && <ButtonUpdate item={item} />
        );

      default:
        return '';
    }
  };

  const ButtonUpdate = ({ item, field = '' }) => {
    return field === 'keterangan' ? (
      <SwitchButton form={form} />
    ) : ['follow_up', 'kendala_dokumen', 'kategori'].indexOf(field) > -1 ? (
      <SectionDropdownKeteranganUpdate
        data={
          field === 'follow_up'
            ? USER.listUnit
            : field === 'kategori'
            ? UNBILL.listKategori
            : UNBILL.listKendala
        }
        io={io}
        form={form}
        type={field}
      />
    ) : (
      <Button
        isAnimated={false}
        handlerClick={() => handlerUpdateKeterangan(item)}
        type="edit"
        name={'update'}
        moreClass={'gap-2'}>
        <PencilAltIcon className="h-4" /> Update Keterangan
      </Button>
    );
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    form.io = io;

    setisSubmit(true);
    await updateKetaranganUnbill(form)
      .then((res) => {
        if (res.status === 200) {
          setShowModal(false);
          swal('Yeay !', res.data.message, 'success');
          dispatch(viewUnbillByIo(io));
          setisSubmit(false);
        } else {
          swal('Oh No!', res.data.message, 'error');
        }
      })
      .catch((err) => {
        swal('Oh No!', err.data.message ?? 'Something Happened!', 'error');
      });
  };

  useEffect(() => {
    getListName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UNBILL]);

  return (
    <div className="mt-8 overflow-auto">
      <TableHeading theading={['No', 'Name', 'Catatan', 'Action']}>
        {Object.entries(UNBILL.unbillSelected)
          .filter((item) => fieldKeterangan.indexOf(item[0]) > -1)
          .map((name, index) => (
            <TableBody key={index}>
              <TableContent>{index + 1}</TableContent>
              <TableContent addClassChild={'uppercase whitespace-pre-line'}>
                {name[0].replace(/_/g, ' ')}
              </TableContent>
              <TableContent
                addClassChild={`${
                  name[1] === 'mansol' ? 'uppercase' : ''
                } whitespace-pre-line`}>
                {name[1]}
              </TableContent>
              <TableContent>
                <OtoritasUpdate item={name} field={name[0]} />
              </TableContent>
            </TableBody>
          ))}
      </TableHeading>

      <Modals
        open={showModal}
        handlerClose={setShowModal}
        dontClose={isSubmit}
        title={`Update Keterangan Dokumen ${selectKeterangan.name.replace(
          /_/g,
          ' ',
        )}`}>
        <form onSubmit={handlerSubmit} className="relative text-left">
          <Textarea
            addClassLabel={'capitalize'}
            labelName={` ${selectKeterangan.name.replace(/_/g, ' ')}`}
            value={form[selectKeterangan.name] ?? ''}
            name={selectKeterangan.name ?? ''}
            handlerChange={handlerChange}
            placeholder={
              selectKeterangan.name === 'keterangan'
                ? 'hanya tulis mansol saja'
                : 'Type here'
            }
          />
          <Button isSubmit={isSubmit}>Update</Button>
        </form>
      </Modals>
    </div>
  );
}
