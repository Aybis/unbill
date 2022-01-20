import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDataPiutangByIO } from '../../redux/actions/piutang';
import { Layout } from '../includes';

export default function ListDetailPiutang() {
  const { id } = useParams();
  const history = useHistory();
  const UNBILL = useSelector((state) => state.unbill);
  const PIUTANG = useSelector((state) => state.piutang);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataPiutangByIO());
  }, [dispatch]);

  return (
    <Layout titlePage={`List  Piutang - ${id}`}>
      <span
        onClick={() => history.goBack()}
        className="relative cursor-pointer flex w-fit mt-4 gap-2 pb-1 items-center hover:border-zinc-500 border-b-2 border-transparent transition-all duration-300 ease-in-out">
        <ArrowLeftIcon className="text-zinc-800 h-4" />
        <span className="text-sm font-medium">Kembali</span>
      </span>

      <div className="relative bg-white p-6 rounded-lg shadow-lg shadow-slate-300/50">
        Testing Data
      </div>
    </Layout>
  );
}
