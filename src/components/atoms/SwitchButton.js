import { Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import {
  updateKetaranganUnbill,
  viewUnbillByIo,
} from '../../redux/actions/unbill';

export default function SwitchButton({ form }) {
  const { io } = useParams();

  const [enabled, setEnabled] = useState(
    form.keterangan === 'mansol' ? true : false,
  );
  const dispatch = useDispatch();

  const testChange = async (event) => {
    form.keterangan = event ? 'mansol' : 'bukan';
    form.io = io;
    await updateKetaranganUnbill(form)
      .then((res) => {
        if (res.status === 200) {
          setEnabled(!enabled);
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

  useEffect(() => {
    setEnabled(form.keterangan === 'mansol' ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div>
      <Switch.Group>
        <div className="flex items-center">
          <Switch.Label className="mr-4">
            {enabled ? '' : 'Bukan Mansol'}
          </Switch.Label>
          <Switch
            checked={enabled}
            onChange={testChange}
            className={`${
              enabled
                ? 'bg-blue-600 shadow-blue-500/50'
                : 'bg-red-500 shadow-red-500/50'
            } shadow-md relative inline-flex items-center h-6 rounded-full w-14 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
            <span
              className={`${
                enabled ? 'translate-x-9' : 'translate-x-0'
              } inline-block w-5 h-5 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>
    </div>
  );
}
