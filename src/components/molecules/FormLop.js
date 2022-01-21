import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { createLop, fetchDataLop, updateLop } from '../../redux/actions/lop';
import { Button, Input } from '../atoms';

export default function FormLop({ handlerClose }) {
  const LOP = useSelector((state) => state.lop);
  const dispatch = useDispatch();
  const [isSubmit, setisSubmit] = useState(false);
  const [form, setform] = useState({
    io: LOP.typeForm === 'update' ? LOP?.lopSelected?.io : '',
    deskripsi_project:
      LOP.typeForm === 'update' ? LOP?.lopSelected?.deskripsi_project : '',
    unit: LOP.typeForm === 'update' ? LOP?.lopSelected?.unit : '',
  });

  // function change input type
  const handlerChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    setisSubmit(true);
    try {
      if (LOP.typeForm === 'create') {
        // insert function
        const insert = await dispatch(createLop(form));

        if (insert.status === 200) {
          dispatch(fetchDataLop(LOP?.allPage?.current_page));
          swal('Yeay!', insert.message, 'success');
          handlerClose(false);
        } else {
          swal('Oh No!', insert.message, 'error');
        }
      } else {
        // update function
        const update = await dispatch(updateLop(LOP?.lopSelected?.id, form));
        if (update.status === 200) {
          dispatch(fetchDataLop(LOP?.allPage?.current_page));
          swal('Yeay!', update.message, 'success');
          handlerClose(false);
        } else {
          swal('Oh No!', update.message, 'error');
        }
      }
    } catch (error) {
      swal('Oh No!', error.message ?? 'Something Happened!', 'error');
    }

    setisSubmit(false);
  };

  return (
    <form onSubmit={handlerSubmit}>
      <div className="flex flex-col gap-4 justify-start text-left">
        <Input
          label={'No. IO'}
          value={form.io}
          name={'io'}
          handlerChange={(e) => handlerChange(e)}
        />
        <Input
          label={'Description Project'}
          value={form.deskripsi_project}
          name={'deskripsi_project'}
          handlerChange={(e) => handlerChange(e)}
        />
        <Input
          label={'Unit'}
          value={form.unit}
          name={'unit'}
          handlerChange={(e) => handlerChange(e)}
        />
      </div>
      <div className="relative flex justify-start items-center mt-8 gap-4">
        <Button isSubmit={isSubmit}>
          {LOP.typeForm === 'create' ? 'Create' : 'Update'}
        </Button>
        <Button type={'out'} handlerClick={() => handlerClose(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
