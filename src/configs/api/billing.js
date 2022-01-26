import axios from '../route/billing';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // endpoint piutang
  headerPiutangTable: () => axios.get('detail-piutang/header'),
  updatePiutang: (id, data) => axios.patch(`detail-piutang/${id}`, data),
  listPiutang: (data) => axios.get('detail-piutang/list', data),
  searchListPiutang: (data) => axios.get('detail-piutang/search', data),
  listPiutangByIo: (data) => axios.get('detail-piutang/by-io', data),
  uploadFilePiutang: (data, handlerProgress) =>
    axios.post('detail-piutang/upload', data, handlerProgress),

  // endpoint invoice
  listInvoice: (data) => axios.get('invoice/list', data),
  headerTableInvoice: () => axios.get('invoice/header'),
  // params : {size, page, io}
  listInvoiceByIo: (params) => axios.get('invoice/by-io', params),

  // endpoint unbill
  listUnbill: (data) => axios.get('unbilled', data),
  viewUnbillByIo: (data) => axios.get('unbilled/detail', data),
  updateKeterangan: (data) => axios.post('keterangan-unbilled/update', data),

  // endpoint document
  updateDocument: (data) => axios.post('document/update', data),
  uploadDocument: (data, handlerProgress) =>
    axios.post('document/upload', data, handlerProgress),
  listFileDocument: (data) => axios.get('document/detail', data),

  // endpoint lop
  listLop: (data) => axios.get('lop/list', data),
  insertLop: (data) => axios.post('lop', data),
  updateLop: (id, data) => axios.patch(`lop/${id}`, data),
  uploadFileLop: (data, handlerProgress) =>
    axios.post('lop/upload', data, handlerProgress),
};
