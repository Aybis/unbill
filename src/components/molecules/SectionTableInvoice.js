import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loading, TableBody, TableContent, TableHeading } from '../atoms';

export default function SectionTableInvoice() {
  const INVOICE = useSelector((state) => state.invoice);

  const fieldRupiah = ['dpp', 'ppn', 'jumlah'];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [INVOICE]);

  return (
    <div className="mt-8 overflow-auto">
      <TableHeading
        theading={['No'].concat(
          INVOICE?.tableHeader?.length > 0
            ? INVOICE?.tableHeader.map((item) => item)
            : '',
        )}>
        {INVOICE.loading ? (
          <TableBody>
            <TableContent
              rowSpan={INVOICE?.tableHeader.length}
              colSpan={INVOICE?.tableHeader.length}>
              <div className="flex justify-start items-center">
                <Loading color={'text-blue-600'} height={6} width={6} />
              </div>
            </TableContent>
          </TableBody>
        ) : INVOICE?.listInvoice?.length > 0 ? (
          INVOICE?.listInvoice?.map((item, index) => {
            return (
              <TableBody key={index}>
                <TableContent>{index + 1}</TableContent>

                {INVOICE.tableHeader.map((nameField) => {
                  return (
                    <TableContent key={Math.random()}>
                      {fieldRupiah.indexOf(nameField) > -1
                        ? 'Rp ' + parseInt(item[nameField]).toLocaleString('id')
                        : item[nameField]}
                    </TableContent>
                  );
                })}
              </TableBody>
            );
          })
        ) : (
          <TableBody>
            <TableContent
              rowSpan={INVOICE?.tableHeader.length}
              colSpan={INVOICE?.tableHeader.length}>
              Tidak Ada Data
            </TableContent>
          </TableBody>
        )}
      </TableHeading>
    </div>
  );
}
