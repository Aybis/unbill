import * as type from '../types/invoice';

export const setListInvoice = (data) => ({
  type: type.LIST_UNBILL,
  payload: data,
});

export const setInvoiceSelected = (data) => ({
  type: type.INVOICE_SELECTED,
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
