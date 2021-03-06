import { convertDate } from '../../helpers/ConvertDate';
import * as type from '../types/lop';

const initialState = {
  listLop: {},
  temporary: '',
  lopSelected: {},
  typeForm: '',
  allPage: {},
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
    case type.LIST_LOP:
      return {
        ...state,
        listLop: action.payload ?? {},
      };

    case type.LOP_SELECTED:
      return {
        ...state,
        lopSelected: action.payload ?? {},
      };

    case type.ALL_PAGE:
      return {
        ...state,
        allPage: action.payload ?? {},
      };

    case type.TYPE_FORM:
      return {
        ...state,
        typeForm: action.payload ?? {},
      };

    case type.TEMPORARY:
      return {
        ...state,
        temporary: action.payload,
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
