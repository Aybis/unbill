import { convertDate } from '../../helpers/ConvertDate';
import * as type from '../types/unbill';

const initialState = {
  listUnbill: [],
  temporary: {},
  unbillSelected: {},
  tableHeader: [
    'ref_key',
    '1._<_1',
    '2._1_-_3',
    '3._4_-_6',
    '4._7_-_12',
    '5._>_12',
    'ar_unbilled_(<_2_bulan)',
    'ar_unbilled_(>_2_bulan)',
    'amd_kl_status',
    'spk_status',
    'ba_denda_status',
    'ba_phpl_status',
    'ba_rekon_status',
    'bapd_status',
    'bapla_status',
    'bapp_status',
    'bast_status',
    'baut_status',
    'kl_status',
    'lpl_status',
    'kb_status',
    'ringkasan_perjanjian_status',
    'surat_pertanggung_jawaban_mutlak_status',
    'billed_dari_unbilled',
    'billed_mtd',
    'catatan_bilco',
    'catatan_operation',
    'catatan_sdv',
    'catatan_ubis',
    'customer',
    'deskripsi_project',
    'follow_up',
    'grand_total',
    'group',
    'id',
    'kategori',
    'kendala_dokumen',
    'kendala_unbilled',
    'reference_project',
    'saldo_unbilled_mtd',
    'sum_of_amt_in_loc_acur',
    'unit_bisnis_pins',
  ],
  allPage: {},
  listDokumen: {},
  dokumenSelected: {},
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
    case type.LIST_UNBILL:
      return {
        ...state,
        listUnbill: action.payload ?? [],
      };

    case type.LIST_DOKUMEN:
      return {
        ...state,
        listDokumen: action.payload ?? [],
      };

    case type.UNBILL_SELECTED:
      return {
        ...state,
        unbillSelected: action.payload ?? {},
      };

    case type.DOKUMEN_SELECTED:
      return {
        ...state,
        dokumenSelected: action.payload ?? {},
      };

    case type.TEMPORARY:
      return {
        ...state,
        temporary: action.payload ?? {},
      };

    case type.ALL_PAGE:
      return {
        ...state,
        allPage: action.payload,
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
