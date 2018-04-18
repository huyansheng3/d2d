import { REAL_SERVER_HOST, SERVER_HOST } from './axios';

const api = {
  // 首页接口
  getTransByLast: `${REAL_SERVER_HOST}/api/trans/getbylast`,
  getTransByKeyfiled: `${REAL_SERVER_HOST}/api/trans/getbykeyfield`,
  
};

export default api;
