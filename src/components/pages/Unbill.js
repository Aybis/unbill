import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDataUnbill, setTemporary } from '../../redux/actions/unbill';
import { Layout } from '../includes';
import { SectionFormSearch, SectionTableUnbill } from '../molecules';

export default function Unbill() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [didMount, setDidMount] = useState(false);

  const handlerRemoveSearch = () => {
    setKeyword('');
    dispatch(setTemporary(keyword));
  };

  const handlerSearch = (event) => {
    event.preventDefault();
    dispatch(setTemporary(keyword));
    dispatch(fetchDataUnbill(keyword));
  };

  useEffect(() => {
    dispatch(setTemporary(''));
    dispatch(fetchDataUnbill());
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!didMount) {
    return null;
  }

  return (
    <Layout titlePage={`List Unbill `}>
      <div className="relative w-full my-8 px-4 py-6 rounded-md bg-white">
        <div className="relative flex justify-between items-center mb-6">
          <SectionFormSearch
            keyword={keyword}
            setKeyword={setKeyword}
            handlerRemoveSearch={handlerRemoveSearch}
            handlerSearch={handlerSearch}
          />
        </div>

        <SectionTableUnbill />
      </div>
    </Layout>
  );
}
