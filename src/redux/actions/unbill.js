import axios from 'axios';
import * as type from '../types/unbill';

export const setListUnbill = (data) => ({
  type: type.LIST_UNBILL,
  payload: data,
});

export const setUnbilSelected = (data) => ({
  type: type.UNBILL_SELECTED,
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

export const fetchDataUnbill = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await axios.get(
      'https://random-data-api.com/api/users/random_user?size=100',
    );
    dispatch(setListUnbill(data.data));
    dispatch(setLoading(false));

    return data.data;
  } catch (err) {
    console.log('error: ', err.response);
  }
  dispatch(setLoading(false));
};
