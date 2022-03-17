import { convertDate } from '../../helpers/ConvertDate';
import * as type from '../types/piutang';

const initialState = {
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
    case type.LIST_PIUTANG:
      return {
        ...state,
        listPiutang: action.payload ?? {},
      };
    case type.TEMPORARY:
      return {
        ...state,
        temporary: action.payload ?? {},
      };
    case type.TABLE_HEADER:
      return {
        ...state,
        tableHeaderPiutang: action.payload ?? {},
      };
    case type.PIUTANG_SELECTED:
      return {
        ...state,
        piutangSelected: action.payload ?? {},
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

    case type.TYPE_PAGE:
      return {
        ...state,
        typePage: action.payload,
      };
    case type.ALL_PAGE:
      return {
        ...state,
        allPage: action.payload,
      };
    case type.CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case type.NEXT_PAGE:
      return {
        ...state,
        nextPage: action.payload,
      };
    case type.PREV_PAGE:
      return {
        ...state,
        prevPage: action.payload,
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
