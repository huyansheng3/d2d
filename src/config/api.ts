import {
  BLOCK_SERVER_HOST,
  SERVER_HOST,
  EASY_PROJECT_HOST,
  ABS_HOST,
  ABS,
} from './axios';

const api = {
  // 首页接口
  getTransByLast: `${BLOCK_SERVER_HOST}/api/trans/getbylast`,
  getTransByKeyfiled: `${BLOCK_SERVER_HOST}/api/trans/getbykeyfield`,
  blockNumber: `${BLOCK_SERVER_HOST}/api/block/getnum`,
  transNumber: `${BLOCK_SERVER_HOST}/api/trans/getnum`,

  // 数据验证
  tableList: `${EASY_PROJECT_HOST}/api/test/states`,
  verifyData: `${EASY_PROJECT_HOST}/api/test/state`,
  calculateHash: `${EASY_PROJECT_HOST}/api/test/verify`,

  login: `${ABS_HOST}/login`,
  nodeMainTain: `${ABS_HOST}/nodeMainTain`,

  products: `${ABS}/products`,
  permission: `${ABS}/permission`,
  productDownload: `${ABS}/product`,
};

export default api;
