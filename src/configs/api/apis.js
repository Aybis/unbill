import axios from '../route/api';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // user endpoint
  login: (data) => axios.post('auth/token/request', data),
  detailUser: () => axios.get('auth/token/detail'),
  refreshToken: () => axios.post('auth/token/refresh'),
  logout: () => axios.get('auth/token/revoke'),

  // reset password
  // {phone}
  getOtp: (credentials) => axios.post('auth/otp/generate', credentials),
  // {phone,token}
  verifOtp: (credentials) => axios.post('auth/otp/verification', credentials),
  // {phone,password}
  changePassword: (data) => axios.post('auth/otp/change_password', data),

  // list data endpoint
  listUnit: () => axios.get('cms/unit/get'),
  listDirektorat: () => axios.get('cms/direktorat/get'),
  listSubUnit: () => axios.get('cms/subunit/get'),
  listPosition: () => axios.get('cms/position/get'),

  // list jabatan
  getJabatan: () => axios.get('cms/jobprefix/get'),

  //notif unbill
  // /api/billing/notif/accounting
  notifPriorotas: (params) => axios.post('billing/notif/accounting', params),
  // /api/billing/notif/follow-up
  notifFollowUp: (params) => axios.post('billing/notif/follow-up', params),
};
