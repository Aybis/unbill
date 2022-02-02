import { convertDate } from '../../helpers/ConvertDate';
import * as type from '../types/invoice';

const initialState = {
  listInvoice: {},
  temporary: {},
  invoiceSelected: {},
  page: {},
  tableHeader: [
    'customer',
    'detail',
    'tgl_inv',
    'no_inv',
    'dpp',
    'ppn',
    'jumlah',
    'tgl_bayar',
    'diterima',
  ],
  current_page: {},
  bulan: convertDate('bulan'),
  tahun: convertDate('tahun'),
  loading: false,
  error: false,
  message: '',
  status: 'idle',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.LIST_INVOICE:
      return {
        ...state,
        listInvoice: action.payload ?? {},
      };

    case type.INVOICE_SELECTED:
      return {
        ...state,
        invoiceSelected: action.payload ?? {},
      };

    case type.TEMPORARY:
      return {
        ...state,
        temporary: action.payload ?? {},
      };

    case type.TAHUN:
      return {
        ...state,
        tahun: action.payload,
      };

    case type.BULAN:
      return {
        ...state,
        bulan: action.payload,
      };

    case type.MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    case type.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case type.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case type.STATUS:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
}
