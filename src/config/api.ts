import { BLOCK_SERVER_HOST, SERVER_HOST, EASY_PROJECT_HOST } from './axios';

const api = {
  // 首页接口
  getTransByLast: `${BLOCK_SERVER_HOST}/api/trans/getbylast`,
  getTransByKeyfiled: `${BLOCK_SERVER_HOST}/api/trans/getbykeyfield`,

  // 数据验证
  tableList: `${EASY_PROJECT_HOST}/api/test/states`,
  verifyData: `${EASY_PROJECT_HOST}/api/test/state`,
  calculateHash: `${EASY_PROJECT_HOST}/api/test/verify`,
};

export default api;
