import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


const IST_TIMEZONE = 'Asia/Kolkata';

export const getCurrentJST = () => {
  return dayjs().tz(IST_TIMEZONE).format('YYYY-MM-DD HH:mm:ss');
};

export const getAddToCurrentJST = (num: number, unit: dayjs.ManipulateType) => {
  return dayjs().tz(IST_TIMEZONE).add(num, unit).format('YYYY-MM-DD HH:mm:ss');
};

export const isAfterCurrentJST = (time: string) => {
  return dayjs(time).isAfter(dayjs().tz(IST_TIMEZONE));
};

// export const getCurrentJST = () => {
//   // TODO format must be 'YYYY-MM-DD HH:mm:ss'
// };

// export const getAddToCurrentJST = (num: number, unit: dayjs.ManipulateType) => {
//   // TODO
// };

// export const isAfterCurrentJST = (time: string) => {
//   // TODO
// };
