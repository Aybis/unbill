import apis from '../../configs/api/apis';
import setHeader from '../../configs/route/setHeader';
import { imageApi } from '../../helpers/Assets';
import * as type from '../types/user';
import Cookies from 'js-cookie';

export const setSession = (data) => ({
  type: type.SESSION,
  payload: data,
});

export const setRefresh = (data) => ({
  type: type.REFRESH,
  payload: data,
});

export const setError = (data) => ({
  type: type.ERROR,
  payload: data,
});

export const setAvatar = (data) => ({
  type: type.IMAGE,
  payload: data,
});

export const setProfile = (data) => ({
  type: type.PROFILE,
  payload: data,
});

export const setListUnit = (data) => ({
  type: type.LIST_UNIT,
  payload: data,
});

export const setLoading = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setMessage = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const userLogin = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await apis.login(data);
    if (result.status === 200) {
      // dispatch token to session
      dispatch(setSession(result.data.data.access_token));

      // insert token to localstorage with name session
      localStorage.setItem(
        'session',
        JSON.stringify(result.data.data.access_token),
      );
      Cookies.set('session', result.data.data.access_token, { expires: 1 });
      dispatch(setRefresh(result.data.data.refresh_token));
      dispatch(setLoading(false));
      return dispatch(userProfile(result.data.data.access_token));
    }
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(true));
    return {
      status: error.response.status,
      message: error.response.data.message,
      data: error.response.data.data,
    };
  }
};

export const userProfile = (data) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    setHeader(data);
    const result = await apis.detailUser();

    if (result.status === 200) {
      dispatch(setProfile(result.data.data));
      dispatch(
        setAvatar(
          result.data.data.image_url ?? imageApi(result.data.data.name),
        ),
      );
    }
    dispatch(setLoading(false));
    return {
      status: result.status,
      message: 'success',
      data: result.data.data,
    };
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(true));

    return {
      status: error.response.status,
      message: error.response.data.message,
      data: error.response.data.data,
    };
  }
};

export const userLogout = async (data) => {
  try {
    setHeader();
    const result = await apis.logout();
    Cookies.remove('session');
    return {
      status: result.status,
      message: result.data.data,
      data: result.data,
    };
  } catch (error) {
    return {
      status: error.status ?? 500,
      message: error.response.data.message ?? 'Something Happened',
      data: null,
    };
  }
};

export const fetchListUnit = () => async (dispatch) => {
  setHeader();

  return await apis
    .listUnit()
    .then((res) => {
      dispatch(setListUnit(res.data.data));
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
