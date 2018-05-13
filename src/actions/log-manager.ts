import { wrapServer } from 'utils/Axios';
import api from 'config/api';

export enum ACTION_TYPE {
  QUERY_LOGIN_LOGS = 'QUERY_LOGIN_LOGS',
  QUERY_DATA_API_LOGS = 'QUERY_DATA_API_LOGS',
  QUERY_USER_LOGS = 'QUERY_USER_LOGS',
  QUERY_ROLE_LOGS = 'QUERY_ROLE_LOGS',
}

export const queryLoginLogs = opts => {
  return {
    type: ACTION_TYPE.QUERY_LOGIN_LOGS,
    promise: wrapServer({
      method: 'get',
      url: api.loginLogsAudit,
      ...opts,
    }),
  };
};

export const queryDataApiLog = opts => {
  return {
    type: ACTION_TYPE.QUERY_DATA_API_LOGS,
    promise: wrapServer({
      method: 'get',
      url: api.dataInterfaceLogAudit,
      ...opts,
    }),
  };
};

export const queryUserLogs = opts => {
  return {
    type: ACTION_TYPE.QUERY_USER_LOGS,
    promise: wrapServer({
      method: 'get',
      url: api.logUserAudit,
      ...opts,
    }),
  };
};

export const queryRoleLogs = opts => {
  return {
    type: ACTION_TYPE.QUERY_ROLE_LOGS,
    promise: wrapServer({
      method: 'get',
      url: api.logRoleAudit,
      ...opts,
    }),
  };
};
