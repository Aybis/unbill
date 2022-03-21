import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '../atoms';

export default function SectionFormUpdateUnbill() {
  const dataField = [
    'follow_up',
    'kendala_unbilled',
    'kendala_dokumen',
    'kategori',
    'catatan_bilco',
    'catatan_operation',
    'catatan_sdv',
    'catatan_ubis',
  ];

  const rupiahTable = [
    'sum_of_amt_in_loc_acur',
    '1._<_1',
    '2._1_-_3',
    '3._4_-_6',
    '4._7_-_12',
    '5._>_12',
    'grand_total',
    'ar_unbilled_(>_2_bulan)',
    'ar_current_(<_2_bulan)',
    'billed_mtd',
    'saldo_unbilled_mtd',
  ];

  const UNBILL = useSelector((state) => state.unbill);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UNBILL]);

  return (
    <>
      <div className="relative mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 col">
          {Object.entries(UNBILL.unbillSelected)
            .filter((item) => item[0] !== 'id' && item[0].search('status') < 0)
            .map((item) =>
              dataField.indexOf(item[0]) > -1 ? (
                ''
              ) : (
                <Input
                  key={item[0]}
                  addClassLabel={'uppercase font-semibold text-zinc-800'}
                  label={item[0].replace(/_/g, ' ')}
                  value={
                    rupiahTable.includes(item[0])
                      ? item[1].toLocaleString('id')
                      : item[1] ?? ''
                  }
                  name={item[0]}
                  required={false}
                  readonly={true}
                  disabled={true}
                />
              ),
            )}
        </div>
      </div>
    </>
  );
}
