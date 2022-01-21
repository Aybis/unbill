import { ArrowLeftIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../atoms';
import Input from '../atoms/Input';
import { Layout } from '../includes';

export default function PreviewPiutang() {
  const history = useHistory();
  const PIUTANG = useSelector((state) => state.piutang);
  const [isSubmit, setisSubmit] = useState(false);
  const [form, setform] = useState({});

  // function change input type
  const handlerChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    setisSubmit(true);
    setTimeout(() => {
      setisSubmit(false);
    }, 400);
  };

  // collect variable name from data selected
  const getListName = () => {
    let data = {};
    Object.entries(PIUTANG.piutangSelected).map((item) => {
      data[item[0]] = item[1];
      return data;
    });
    // insert name of input to variable form
    setform(data);
  };

  useEffect(() => {
    getListName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PIUTANG]);

  return (
    <Layout
      titlePage={`${PIUTANG.typePage} Piutang ${PIUTANG.piutangSelected.ref_key}`}>
      <span
        onClick={() => history.goBack()}
        className="relative cursor-pointer flex w-fit mt-4 gap-2 pb-1 items-center hover:border-zinc-500 border-b-2 border-transparent transition-all duration-300 ease-in-out">
        <ArrowLeftIcon className="text-zinc-800 h-4" />
        <span className="text-sm font-medium">Kembali</span>
      </span>

      <div className="relative mt-8 p-4 rounded-md text-white flex justify-center items-center bg-blue-500 shadow-lg shadow-blue-500/50">
        <h1 className="text-xl font-semibold">
          {PIUTANG.piutangSelected.ref_key} - {PIUTANG.piutangSelected.project}
        </h1>
      </div>

      <form
        onSubmit={handlerSubmit}
        className="relative bg-white rounded-lg p-6 mt-12">
        <div className="grid grid-cols-2 gap-6 ">
          {Object.entries(PIUTANG.piutangSelected)
            .filter(
              (item) =>
                item[0] !== 'id' &&
                item[0] !== 'created_at' &&
                item[0] !== 'updated_at',
            )
            .map((item) => {
              return (
                <Input
                  key={item[0]}
                  label={item[0].replace(/_/g, ' ')}
                  value={form[item[0]] ?? ''}
                  name={item[0]}
                  handlerChange={
                    PIUTANG?.typePage === 'update'
                      ? (e) => handlerChange(e)
                      : undefined
                  }
                  readonly={PIUTANG?.typePage === 'preview' ? true : false}
                  disabled={PIUTANG?.typePage === 'preview' ? true : false}
                />
              );
            })}
        </div>
        {PIUTANG.typePage === 'update' && (
          <div className="relative flex justify-start items-center mt-8 gap-4">
            <Button isSubmit={isSubmit}> Update</Button>
            <Button type={'out'} handlerClick={() => history.goBack()}>
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Layout>
  );
}
