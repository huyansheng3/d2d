import { handle } from 'redux-pack';
import { ACTION_TYPE } from 'actions/log-manager';
import { findIndex, forEach } from 'lodash';
import produce from 'immer';

export const initState = {
  loginLogs: [],
  dataApiLogs: [],
  userLogs: [],
  roleLogs: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.QUERY_LOGIN_LOGS:
      return handle(state, action, {
        success: prevState => {
          return {
            ...prevState,
            loginLogs: action.payload.data,
          };
        },
      });
    case ACTION_TYPE.QUERY_DATA_API_LOGS:
      return handle(state, action, {
        success: prevState => {
          return {
            ...prevState,
            dataApiLogs: action.payload.data,
          };
        },
      });
    case ACTION_TYPE.QUERY_USER_LOGS:
      return handle(state, action, {
        success: prevState => {
          return {
            ...prevState,
            userLogs: action.payload.data,
          };
        },
      });
    case ACTION_TYPE.QUERY_ROLE_LOGS:
      return handle(state, action, {
        success: prevState => {
          return {
            ...prevState,
            roleLogs: action.payload.data,
          };
        },
      });
    default:
      return state;
  }
};
