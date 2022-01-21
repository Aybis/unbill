import billing from '../../configs/api/billing';
import * as type from '../types/unbill';

export const setListUnbill = (data) => ({
  type: type.LIST_UNBILL,
  payload: data,
});

export const setUnbilSelected = (data) => ({
  type: type.UNBILL_SELECTED,
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

export const fetchDataUnbill = (data) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const result = await billing.listUnbill({
      params: {
        page: data,
      },
    });

    dispatch(setAllPage(result.data));
    dispatch(setListUnbill(result.data.data));
    dispatch(setLoading(false));
    return result;
  } catch (error) {
    return error;
  }
};
