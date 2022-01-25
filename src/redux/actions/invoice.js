import billing from '../../configs/api/billing';
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

export const fetchInvoiceByIO = async (data) => {
  try {
    const result = await billing.listInvoice({
      params: {
        io: data,
      },
    });

    return result;
  } catch (error) {
    return error;
  }
};

export const fetchDataTableHeaderInvoice = () => async (dispatch) => {
  try {
    const data = await billing.headerTableInvoice();
    return data.data;
  } catch (err) {
    return err;
  }
};
