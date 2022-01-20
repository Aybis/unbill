import axios from '../route/billing';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // endpoint piutang
  updatePiutang: (data) => axios.patch('detail-piutang', data),
  listPiutangByIo: (data) => axios.get('detail-piutang/by-io', data),
  headerPiutangTable: () => axios.get('detail-piutang/header'),
  uploadFilePiutang: (data) => axios.get('detail-piutang/upload', data),

  // endpoint invoice
  // params : {size, page, io}
  listInvoice: (params) => axios.get('invoice/by-io', params),

  // endpoint unbill
  listUnbill: (params) => axios.get('unbilled', params),
  uploadFile: (data) => axios.post('lop/upload', data),
};
