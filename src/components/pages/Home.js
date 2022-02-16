import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import billing from '../../configs/api/billing';
import { convertDate } from '../../helpers/ConvertDate';
import { Loading, TableBody, TableContent, TableHeading } from '../atoms';
import { Layout } from '../includes';
import { SectionFilterMonthYear } from '../molecules';

export default function Home() {
  const [testData, settestData] = useState({});

  let total1 = [];
  let total2 = [];
  let total3 = [];
  let total4 = [];
  let total5 = [];
  let total6 = [];
  let total7 = [];

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

  useEffect(() => {
    const testData = async () => {
      return await billing
        .summaryData()
        .then((res) => {
          settestData(res.data);
        })
        .catch((err) => {});
    };

    testData();
  }, []);

  return (
    <Layout titlePage="Dashboard">
      <h1 className="relative mt-2 text-zinc-600">
        {convertDate('tanggalHari')}
      </h1>
      <div className="relative w-full my-8">
        <div className=" justify-center items-center w-full my-8 hidden">
          <SectionFilterMonthYear
            handlerChange={handlerOnChange}
            month={temp.month}
            year={temp.year}
          />
        </div>

        <div className="relative p-4 bg-white rounded-lg overflow-auto">
          <TableHeading
            theading={[
              'Group',
              'Grand Total',
              'AR Unbilled (>2 Bulan)',
              'AR Current (<2 Bulan)',
              'bill mtd',
              'saldo unbilled mtd',
              'paid',
              'project',
            ]}
            footer={
              <TableBody addClass={'bg-blue-100 hover:bg-blue-100'}>
                <TableContent addClassChild={'font-bold'}>
                  Grand Total
                </TableContent>
                <TableContent addClassChild={'font-bold'}>
                  Rp{' '}
                  {testData.length > 0
                    ? testData.forEach((item) => {
                        total1.push(
                          parseFloat(
                            parseFloat(item.grang_total / 1000000000).toFixed(
                              2,
                            ),
                          ),
                        );
                      })
                    : 0}
                  {total1.length > 0 &&
                    total1
                      .reduce((curr, next) => curr + next)
                      .toLocaleString('id')}
                </TableContent>
                <TableContent addClassChild={'font-bold'}>
                  {' '}
                  Rp{' '}
                  {testData.length > 0
                    ? testData.forEach((item) => {
                        total2.push(
                          parseFloat(
                            parseFloat(
                              item['ar_unbilled(>2bulan)'] / 1000000000,
                            ).toFixed(2),
                          ),
                        );
                      })
                    : 0}
                  {total2.length > 0 &&
                    total2
                      .reduce((curr, next) => curr + next)
                      .toLocaleString('id')}
                </TableContent>
                <TableContent addClassChild={'font-bold'}>
                  Rp{' '}
                  {testData.length > 0
                    ? testData.forEach((item) => {
                        total3.push(
                          parseFloat(
                            parseFloat(
                              item['ar_current(<2bulan)'] / 1000000000,
                            ).toFixed(2),
                          ),
                        );
                      })
                    : 0}
                  {total3.length > 0 &&
                    total3
                      .reduce((curr, next) => curr + next)
                      .toLocaleString('id')}
                </TableContent>
                <TableContent addClassChild={'font-bold'}>
                  Rp{' '}
                  {testData.length > 0
                    ? testData.forEach((item) => {
                        total4.push(
                          parseFloat(
                            parseFloat(item.billed_mtd / 1000000000).toFixed(2),
                          ),
                        );
                      })
                    : 0}
                  {total4.length > 0 &&
                    total4
                      .reduce((curr, next) => curr + next)
                      .toLocaleString('id')}
                </TableContent>
                <TableContent addClassChild={'font-bold'}>
                  {' '}
                  Rp{' '}
                  {testData.length > 0
                    ? testData.forEach((item) => {
                        total5.push(
                          parseFloat(
                            parseFloat(
                              item.saldo_unbillied_mtd / 1000000000,
                            ).toFixed(2),
                          ),
                        );
                      })
                    : 0}
                  {total5.length > 0 &&
                    total5
                      .reduce((curr, next) => curr + next)
                      .toLocaleString('id')}
                </TableContent>
                <TableContent addClassChild={'font-bold'}>
                  {' '}
                  Rp{' '}
                  {testData.length > 0
                    ? testData.forEach((item) => {
                        total6.push(
                          parseFloat(
                            parseFloat(item.paid / 1000000000).toFixed(2),
                          ),
                        );
                      })
                    : 0}
                  {total6.length > 0 &&
                    total6
                      .reduce((curr, next) => curr + next)
                      .toLocaleString('id')}
                </TableContent>
                <TableContent addClassChild={'font-bold'}>
                  {testData.length > 0
                    ? testData.forEach((item) => {
                        total7.push(item.project);
                      })
                    : 0}
                  {total7.length > 0 &&
                    total7
                      .reduce((curr, next) => curr + next)
                      .toLocaleString('id')}
                </TableContent>
              </TableBody>
            }>
            {Object.entries(testData).length > 0 ? (
              testData.map((item, index) => (
                <TableBody key={index}>
                  <TableContent addClassChild={'whitespace-normal'}>
                    {index === 0
                      ? 'A.CFUE'
                      : index === 1
                      ? 'B.TELKOM GROUP'
                      : index === 2
                      ? 'C.TELKOMSEL'
                      : index === 3
                      ? 'D.THIRD PARTY'
                      : ''}
                  </TableContent>
                  <TableContent addClassChild={'whitespace-normal'}>
                    Rp{' '}
                    {parseFloat(item.grang_total / 1000000000).toLocaleString(
                      'id',
                    )}
                  </TableContent>
                  <TableContent addClassChild={'whitespace-normal'}>
                    Rp{' '}
                    {parseFloat(
                      item['ar_unbilled(>2bulan)'] / 1000000000,
                    ).toLocaleString('id')}
                  </TableContent>
                  <TableContent addClassChild={'whitespace-normal'}>
                    Rp{' '}
                    {parseFloat(
                      item['ar_current(<2bulan)'] / 1000000000,
                    ).toLocaleString('id')}
                  </TableContent>
                  <TableContent addClassChild={'whitespace-normal'}>
                    Rp{' '}
                    {parseFloat(item.billed_mtd / 1000000000).toLocaleString(
                      'id',
                    )}
                    <span className="ml-2 text-zinc-800 font-bold">
                      (
                      {(
                        (parseInt(item.billed_mtd) /
                          parseInt(item.grang_total)) *
                        100
                      ).toFixed(2)}
                      %)
                    </span>
                  </TableContent>
                  <TableContent addClassChild={'whitespace-normal'}>
                    Rp{' '}
                    {parseFloat(
                      item.saldo_unbillied_mtd / 1000000000,
                    ).toLocaleString('id')}
                  </TableContent>
                  <TableContent addClassChild={'whitespace-normal'}>
                    {parseFloat(item.paid) > 0
                      ? 'Rp' +
                        parseFloat(item.paid / 1000000000).toLocaleString('id')
                      : item.paid}
                  </TableContent>
                  <TableContent>{item.project}</TableContent>
                </TableBody>
              ))
            ) : (
              <TableBody>
                <TableContent colSpan={9} rowSpan={9}>
                  <Loading color={'text-blue-500'} height={5} width={5} />
                </TableContent>
              </TableBody>
            )}
          </TableHeading>

          <p className="mt-4 text-sm text-zinc-500 pl-4">*Nilai dalam Miliar</p>
        </div>

        <div className="hidden grid-cols-1 lg:grid-cols-4 gap-4 my-12 ">
          {Array.from({ length: 8 }).map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              key={Math.random()}
              className="flex justify-center items-center cursor-pointer bg-white rounded-lg shadow shadow-zinc-200/50 h-44 p-4">
              Anonymous
            </motion.div>
          ))}
        </div>

        <div className="hidden grid-cols-1 lg:grid-cols-2 gap-4 my-12">
          {Array.from({ length: 4 }).map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              key={Math.random()}
              className="flex justify-center items-center cursor-pointer bg-white rounded-lg shadow shadow-zinc-200/50 h-44 p-4">
              Anonymous
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
