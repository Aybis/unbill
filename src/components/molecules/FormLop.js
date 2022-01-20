import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Input } from '../atoms';

export default function FormLop() {
  const [isSubmit, setisSubmit] = useState(false);
  const [form, setform] = useState({});
  const history = useHistory();
  const LOP = useSelector((state) => state.lop);

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
    Object.entries(LOP.lopSelected).map((item) => {
      data[item[0]] = item[1];
      return data;
    });
    // insert name of input to variable form
    setform(data);
  };

  useEffect(() => {
    getListName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LOP]);

  return (
    <form onSubmit={handlerSubmit}>
      <div className="grid grid-cols-2 gap-6 ">
        {Object.entries(LOP.lopSelected).map((item) => {
          return (
            <Input
              key={item[0]}
              label={item[0].replace(/_/g, ' ')}
              value={form[item[0]] ?? ''}
              name={item[0]}
              handlerChange={(e) => handlerChange(e)}
            />
          );
        })}
      </div>
      <div className="relative flex justify-start items-center mt-8 gap-4">
        <Button isSubmit={isSubmit}>
          {LOP.typeForm === 'create' ? 'Create' : 'Update'}
        </Button>
        <Button type={'out'} handlerClick={() => history.goBack()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
