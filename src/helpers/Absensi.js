import { convertDate } from './ConvertDate';

export default function Absensi({ shift = 0, kondisi, children }) {
  let masukPagi = 8.15;
  let masukSiang = 11.15;
  let masukMalam = 21.15;

  if (kondisi !== 'sehat' || kondisi === '') {
    return children;
  } else {
    if (shift <= 1) {
      return convertDate('convertTime') > masukPagi && children;
    } else if (shift === '2') {
      return convertDate('convertTime') > masukSiang && children;
    } else if (shift === '3') {
      return convertDate('convertTime') > masukMalam && children;
    } else {
      return false;
    }
  }
}
