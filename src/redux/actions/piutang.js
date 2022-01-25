import billing from '../../configs/api/billing';
import * as type from '../types/piutang';

export const setListPiutang = (data) => ({
  type: type.LIST_PIUTANG,
  payload: data,
});

export const setTableHeader = (data) => ({
  type: type.TABLE_HEADER,
  payload: data,
});

export const setPiutangSelected = (data) => ({
  type: type.PIUTANG_SELECTED,
  payload: data,
});

export const settAllPage = (data) => ({
  type: type.ALL_PAGE,
  payload: data,
});

export const setLoading = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setError = (data) => ({
  type: type.ERROR,
  payload: data,
});

export const setTypePage = (data) => ({
  type: type.TYPE_PAGE,
  payload: data,
});

export const setMessage = (data) => ({
  type: type.MESSAGE,
  payload: data,
});
export const setStatus = (data) => ({
  type: type.STATUS,
  payload: data,
});

export const fetchDataPiutang = (data) => async (dispatch) => {
  dispatch(setLoading(true));

  const result = await billing
    .listPiutang({
      params: {
        page: data ?? 1,
      },
    })
    .then((res) => {
      dispatch(settAllPage(res.data));
      dispatch(setListPiutang(res.data.data));
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  dispatch(setLoading(false));
  return result;
};

export const fetchDataTableHeaderPiutang = () => async (dispatch) => {
  try {
    const data = await billing.headerPiutangTable();
    dispatch(setTableHeader(data.data));

    return data.data;
  } catch (err) {
    return err;
  }
};

export const fetchDataPiutangByIO = (data, page) => async (dispatch) => {
  dispatch(fetchDataTableHeaderPiutang());
  dispatch(setLoading(true));
  try {
    const result = await billing.listPiutangByIo({
      params: {
        io: data,
        page: page ?? 1,
      },
    });
    dispatch(settAllPage(result.data));
    dispatch(setListPiutang(result.data.data));
    dispatch(setLoading(false));
    return result;
  } catch (error) {
    dispatch(setLoading(false));

    return error;
  }
};

export const uploadFileData = (data) => async (dispatch) => {
  try {
    const result = await billing.uploadFilePiutang(data, {
      onUploadProgress: (progressEvent) => {
        dispatch(
          setStatus(
            'Upload Progress ' +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              '%',
          ),
        );
      },
    });
    return {
      status: result.status,
      message: result.data.message,
      data: {},
    };
  } catch (error) {
    return {
      status: error.status,
      message: error.data.message ?? 'Something Happened!',
      data: null,
    };
  }
};
