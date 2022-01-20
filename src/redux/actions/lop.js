import axios from 'axios';
import * as type from '../types/lop';

export const setListLop = (data) => ({
  type: type.LIST_LOP,
  payload: data,
});

export const setLopSelected = (data) => ({
  type: type.LOP_SELECTED,
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
