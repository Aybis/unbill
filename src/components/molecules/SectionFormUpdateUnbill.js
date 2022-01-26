import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import {
  updateKetaranganUnbill,
  viewUnbillByIo,
} from '../../redux/actions/unbill';
import { Button, Input, Textarea } from '../atoms';

export default function SectionFormUpdateUnbill() {
  const { io } = useParams();
  const dispatch = useDispatch();
  const [form, setform] = useState({});
  const [isUpdate, setisUpdate] = useState(false);
  const dataField = [
    'follow_up',
    'kendala_unbilled',
    'kendala_dokumen',
    'kategori',
    'catatan_bilco',
    'catatan_operation',
    'catatan_sdv',
    'catatan_ubis',
  ];

  const UNBILL = useSelector((state) => state.unbill);

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

  const handlerSubmit = async (event) => {
    event.preventDefault();
    form.io = io;
    await updateKetaranganUnbill(form)
      .then((res) => {
        if (res.status === 200) {
          swal('Yeay !', res.data.message, 'success');
          dispatch(viewUnbillByIo(io));
          setisUpdate(false);
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
    <>
      <form onSubmit={handlerSubmit} className="relative mt-8">
        <div className="grid grid-cols-2 gap-6 col">
          {Object.entries(UNBILL.unbillSelected)
            .filter((item) => item[0] !== 'id' && item[0].search('status') < 0)
            .map((item) =>
              dataField.indexOf(item[0]) > -1 ? (
                <div key={item[0]} className="relative col-span-2">
                  <Textarea
                    addClassLabel={'uppercase font-semibold text-zinc-800'}
                    name={item[0]}
                    handlerInput={handlerChange}
                    value={form[item[0]] ?? ''}
                    labelName={item[0].replace(/_/g, ' ')}
                    readOnly={isUpdate ? false : true}
                    disabled={isUpdate ? false : true}
                    placeholder={item[0].replace(/_/g, ' ')}
                    inputClassName={'placeholder:uppercase'}
                  />
                </div>
              ) : (
                <Input
                  key={item[0]}
                  addClassLabel={'uppercase font-semibold text-zinc-800'}
                  label={item[0].replace(/_/g, ' ')}
                  value={item[1] ?? ''}
                  name={item[0]}
                  required={false}
                  readonly={true}
                  disabled={true}
                />
              ),
            )}
        </div>
        {isUpdate && (
          <div className="mt-8 flex gap-4">
            <Button type="in">Update Keterangan</Button>
            <Button type="out" handlerClick={() => setisUpdate(false)}>
              Cancel{' '}
            </Button>
          </div>
        )}
      </form>
      {!isUpdate && (
        <div className="mt-8">
          <Button handlerClick={() => setisUpdate(true)} type="edit">
            Apakah Anda Ingin Update Keterangan ?{' '}
          </Button>
        </div>
      )}
    </>
  );
}
