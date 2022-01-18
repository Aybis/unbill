import axios from 'axios';
import * as type from '../types/piutang';

export const setListPiutang = (data) => ({
  type: type.LIST_PIUTANG,
  payload: data,
});

export const setPiutangSelected = (data) => ({
  type: type.PIUTANG_SELECTED,
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

export const fetchDataApi = () => async (dispatch) => {
  dispatch(setLoading(true));
  const result = await axios
    .get('https://random-data-api.com/api/cannabis/random_cannabis?size=100')
    .then((res) => {
      dispatch(setListPiutang(res.data));
      return res.data;
    })
    .catch((err) => {
      dispatch(setError(true));
      return err;
    });
  dispatch(setLoading(false));

  return result;
};
