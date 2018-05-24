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
  getTransByTableName: `${BLOCK_SERVER_HOST}/api/trans/getByTableName`,
  getTransByPartyName: `${BLOCK_SERVER_HOST}/api/trans/getByPartyName`,
  getHashByKeyfield: `${BLOCK_SERVER_HOST}/api/trans/gethashbykeyfield`,
  getBlockByLast: `${BLOCK_SERVER_HOST}/api/block/getbylast`,

  blockNumber: `${BLOCK_SERVER_HOST}/api/block/getnum`,
  transNumber: `${BLOCK_SERVER_HOST}/api/trans/getnum`,

  // 数据验证
  tableList: `${EASY_PROJECT_HOST}/api/test/states`,

  calculateHash: `${ABS}/verify`,
  verifyData: `${ABS}/state`,

  login: `${ABS_HOST}/login`,
  logout: `${ABS_HOST}/logout`,
  nodes: `${ABS_HOST}/nodes`,
  nodeMainTain: `${ABS_HOST}/nodeMainTain`,
  changePassword: `${ABS_HOST}/user/changePassword`,
  roles: `${ABS_HOST}/roles`,
  findRoles: `${ABS_HOST}/roles/findRoles`,
  corporateInfo: `${ABS_HOST}/corporateInfo`,
  user: `${ABS_HOST}/user`,
  findUser: `${ABS_HOST}/user/findUser`,
  userPassword: `${ABS_HOST}/user/password`,

  // 日志模块
  loginLogs: `${ABS_HOST}/logLogin`,
  loginLogsAudit: `${ABS_HOST}/logLogin/audit`,
  loginLogsExport: `${ABS_HOST}/logLogin/export`,
  dataInterfaceLog: `${ABS_HOST}/dataInterfaceLog`,
  dataInterfaceLogAudit: `${ABS_HOST}/dataInterfaceLog/audit`,
  logRole: `${ABS_HOST}/logRole`,
  logRoleAudit: `${ABS_HOST}/logRole/audit`,
  logRoleExport: `${ABS_HOST}/logRole/export`,
  logUser: `${ABS_HOST}/logUser`,
  logUserAudit: `${ABS_HOST}/logUser/audit`,
  logUserExport: `${ABS_HOST}/logUser/export`,

  products: `${ABS}/products`,
  fileTypes: `${ABS}/fileTypes`,
  permission: `${ABS}/permission`,
  permissionCurrent: `${ABS}/permission/current`,
  permissionConfig: `${ABS}/permission/config`,
  productDownload: `${ABS}/product`,
  attachment: `${ABS}/attachment`,
  attachments: `${ABS}/attachment/all`,
  getAttachment: `${ABS}/getAttachment`,
  upload: `${ABS}/upload`,
  tables: `${ABS}/tables`,
};

export default api;
