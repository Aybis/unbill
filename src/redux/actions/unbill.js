import billing from '../../configs/api/billing';
import * as type from '../types/unbill';

export const setListUnbill = (data) => ({
  type: type.LIST_UNBILL,
  payload: data,
});

export const setTemporary = (data) => ({
  type: type.TEMPORARY,
  payload: data,
});

export const setListBuktiSerahTerima = (data) => ({
  type: type.LIST_BUKTI_SERAH_TERIMA,
  payload: data,
});

export const setBuktiSerahTerimaSelected = (data) => ({
  type: type.BUKTI_SERAH_TERIMA_SELECTED,
  payload: data,
});

export const setListDokumen = (data) => ({
  type: type.LIST_DOKUMEN,
  payload: data,
});

export const setUnbilSelected = (data) => ({
  type: type.UNBILL_SELECTED,
  payload: data,
});

export const setDokumenSelected = (data) => ({
  type: type.DOKUMEN_SELECTED,
  payload: data,
});

export const setAllPage = (data) => ({
  type: type.ALL_PAGE,
  payload: data,
});

export const setAllPageBuktiSerahTerima = (data) => ({
  type: type.BUKT_SERAH_TERIMA_ALL_PAGE,
  payload: data,
});

export const setListKategori = (data) => ({
  type: type.LIST_KATEGORI,
  payload: data,
});

export const setListKendala = (data) => ({
  type: type.LIST_KENDALA,
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

export const fetchDataUnbill = (keyword, page) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const result = await billing.listUnbill({
      params: {
        page: page,
        keyword: keyword ?? '',
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

export const updateKetaranganUnbill = async (data) => {
  return await billing
    .updateKeterangan(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const updateStatusDokumen = (data) => async (dispatch) => {
  try {
    const result = await billing.updateDocument(data);
    return {
      status: result.status,
      message: result.data.message,
      data: {},
    };
  } catch (error) {
    return {
      status: error.response,
      message: error.response.data.message ?? 'Something Happened!',
      data: null,
    };
  }
};

export const uploadStatusDokumen = (data) => async (dispatch) => {
  try {
    const result = await billing.uploadDocumentMultiple(data, {
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

export const deleteFile = (data) => async (dispatch) => {
  try {
    const result = await billing.deleteFile(data);
    return result;
  } catch (error) {
    return error;
  }
};

export const viewUnbillByIo = (data) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const result = await billing.viewUnbillByIo({
      params: {
        io: data,
      },
    });
    dispatch(setUnbilSelected(result.data[0]));
    dispatch(setLoading(false));

    return result;
  } catch (error) {
    dispatch(setLoading(false));

    return error;
  }
};

export const fetchListFileDokumen = (data) => async (dispatch) => {
  return await billing
    .listFileDocument({
      params: {
        io: data,
      },
    })
    .then((res) => {
      dispatch(setListDokumen(res.data));
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchListBuktiSerahTerima = (io) => async (dispatch) => {
  return await billing
    .listSerahTerima({
      params: {
        io: io,
      },
    })
    .then((res) => {
      dispatch(setListBuktiSerahTerima(res.data.data));
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const uploadBuktiSerahTerima = (data) => async (dispatch) => {
  try {
    const result = await billing.uploadSerahTerima(data, {
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
    console.log(result);
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

export const fetchListKategori = () => async (dispatch) => {
  return await billing
    .listKategori()
    .then((res) => {
      dispatch(setListKategori(res.data));
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchListKendala = () => async (dispatch) => {
  return await billing
    .listKendala()
    .then((res) => {
      dispatch(setListKendala(res.data));

      return res;
    })
    .catch((err) => {
      return err;
    });
};
