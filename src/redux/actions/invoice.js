import billing from '../../configs/api/billing';
import * as type from '../types/invoice';

export const setListInvoice = (data) => ({
  type: type.LIST_INVOICE,
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

export const fetchDataTableHeaderInvoice = () => async (dispatch) => {
  try {
    const data = await billing.headerTableInvoice();
    return data.data;
  } catch (err) {
    return err;
  }
};

export const fetchDataInvioiceByIo = (io) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await billing.listInvoiceByIo({
      params: {
        io: io,
      },
    });
    dispatch(setListInvoice(result.data));
    dispatch(setLoading(false));
    return result;
  } catch (error) {
    dispatch(setLoading(false));

    return error;
  }
};
