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
                  value={item[1] ?? ''}
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
