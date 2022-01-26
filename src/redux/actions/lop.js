import axios from '../../configs/route/api';

import billing from '../../configs/api/billing';
import * as type from '../types/lop';

export const setListLop = (data) => ({
  type: type.LIST_LOP,
  payload: data,
});

export const setTemporary = (data) => ({
  type: type.TEMPORARY,
  payload: data,
});

export const setLopSelected = (data) => ({
  type: type.LOP_SELECTED,
  payload: data,
});

export const setAllPage = (data) => ({
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

export const setMessage = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const setStatus = (data) => ({
  type: type.STATUS,
  payload: data,
});

export const setTypeForm = (data) => ({
  type: type.TYPE_FORM,
  payload: data,
});

export const uploadFileLop = (data) => async (dispatch) => {
  try {
    const result = await billing.uploadFileLop(data, {
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

export const fetchDataLop = (keyword, page) => async (dispatch) => {
  dispatch(setLoading(true));

  const result = await billing
    .listLop({
      params: {
        keyword: keyword,
        page: page,
      },
    })
    .then((res) => {
      dispatch(setAllPage(res.data));
      dispatch(setListLop(res.data.data));
      return res.data;
    })
    .catch((err) => {
      dispatch(setError(true));
      return err.response;
    });

  dispatch(setLoading(false));
  return result;
};

export const createLop = (data) => async (dispatch) => {
  try {
    const result = await billing.insertLop(data);
    return {
      status: result.status,
      message: result.data.message,
      data: {},
    };
  } catch (error) {
    return {
      status: error?.response?.status ?? 400,
      message: error?.response?.data?.message ?? 'Something Happened!',
      data: null,
    };
  }
};

export const updateLop = (data, form) => async (dispatch) => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  try {
    const result = await billing.updateLop(data, form);
    return {
      status: result.status,
      message: result.data.message,
      data: {},
    };
  } catch (error) {
    return {
      status: error?.response?.status ?? 400,
      message: error?.response?.data?.message ?? 'Something Happened!',
      data: null,
    };
  }
};
