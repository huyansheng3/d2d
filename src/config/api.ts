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
  logout: `${ABS_HOST}/logout`,
  nodes: `${ABS_HOST}/nodes`,
  nodeMainTain: `${ABS_HOST}/nodeMainTain`,
  changePassword: `${ABS_HOST}/user/changePassword`,
  roles: `${ABS_HOST}/roles`,
  findRoles: `${ABS_HOST}/roles/findRoles`,
  corporateInfo: `${ABS_HOST}/corporateInfo`,

  products: `${ABS}/products`,
  permission: `${ABS}/permission`,
  permissionCurrent: `${ABS}/permission/current`,
  permissionConfig: `${ABS}/permission/config`,
  productDownload: `${ABS}/product`,
  attachment: `${ABS}/attachment`,
  attachments: `${ABS}/attachment/all`,
  upload: `${ABS}/upload`,
  tables: `${ABS}/tables`,
};

export default api;
