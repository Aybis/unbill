import React from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import {
  updateKetaranganUnbill,
  viewUnbillByIo,
} from '../../redux/actions/unbill';

export default function SectionDropdownKeteranganUpdate({
  type,
  form,
  io,
  data,
}) {
  const dispatch = useDispatch();

  const handlerChange = async (event) => {
    form.io = io;
    form[type] = event.target.value;

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

  return (
    <div>
      <select
        name="month"
        onChange={(event) => handlerChange(event)}
        className="px-4 py-2 rounded bg-white border-2 pr-8 border-zinc-200 focus:border-blue-500 w-fit">
        <option disabled>Pilih {type.replace('_', ' ')}</option>
        {data.length > 0 &&
          data.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}
