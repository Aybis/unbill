import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { convertDate } from '../../helpers/ConvertDate';
import { Layout } from '../includes';
import { SectionFilterMonthYear } from '../molecules';

export default function Home() {
  const [temp, settemp] = useState({
    month: convertDate('bulan'),
    tahun: convertDate('tahun'),
  });

  const handlerOnChange = (event) => {
    event.preventDefault();

    if (event.target.name === 'month') {
      settemp({
        month: event.target.value,
        year: temp.year,
      });
    }

    if (event.target.name === 'year') {
      settemp({
        year: event.target.value,
        month: temp.month,
      });
    }
  };

  return (
    <Layout titlePage="Dashboard">
      <h1 className="relative mt-2 text-zinc-600">
        {convertDate('tanggalHari')}
      </h1>
      <div className="relative w-full my-8">
        <div className="flex justify-center items-center w-full my-8">
          <SectionFilterMonthYear
            handlerChange={handlerOnChange}
            month={temp.month}
            year={temp.year}
          />
        </div>
        <div className="grid grid-cols-4 gap-4 my-12">
          {Array.from({ length: 8 }).map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              key={Math.random()}
              className="flex cursor-pointer bg-white rounded-lg shadow shadow-zinc-200/50 h-44 p-4">
              Test
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
