import { wrapServer } from 'utils/Axios';
import api from 'config/api';

export enum ACTION_TYPE {
  QUERY_ROLES = 'QUERY_ROLES',
  CREATE_ROLE = 'CREATE_ROLE',
  UPDATE_ROLE = 'UPDATE_ROLE',
  UPDATE_ROLE_STATUS = 'UPDATE_ROLE_STATUS',
  QUERY_CORPORATE = 'QUERY_CORPORATE',
  QUERY_USERS = 'QUERY_USERS',
  CREATE_USER = 'CREATE_USER',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_USER_STATUS = 'UPDATE_USER_STATUS',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

export const queryRoles = () => {
  return {
    type: ACTION_TYPE.QUERY_ROLES,
    promise: wrapServer({
      method: 'get',
      url: api.roles,
    }),
  };
};

export const findRoles = params => {
  return {
    type: ACTION_TYPE.QUERY_ROLES,
    promise: wrapServer({
      method: 'get',
      url: api.roles,
      params: params,
    }),
  };
};

export const createRole = data => {
  return {
    type: ACTION_TYPE.CREATE_ROLE,
    promise: wrapServer({
      url: api.roles,
      data,
    }),
  };
};

export const updateRole = data => {
  return {
    type: ACTION_TYPE.UPDATE_ROLE,
    promise: wrapServer({
      method: 'put',
      url: api.roles,
      data,
    }),
  };
};

export const updateRoleStatus = opts => {
  return {
    type: ACTION_TYPE.UPDATE_ROLE_STATUS,
    payload: { ...opts },
    promise: wrapServer({
      method: 'patch',
      url: api.roles,
      ...opts,
    }),
  };
};

export const queryCorporate = opts => {
  return {
    type: ACTION_TYPE.QUERY_CORPORATE,
    promise: wrapServer({
      method: 'get',
      url: api.corporateInfo,
      ...opts,
    }),
  };
};

export const queryUsers = opts => {
  return {
    type: ACTION_TYPE.QUERY_USERS,
    promise: wrapServer({
      method: 'get',
      url: api.findUser,
      ...opts,
    }),
  };
};

export const createUser = opts => {
  return {
    type: ACTION_TYPE.CREATE_USER,
    promise: wrapServer({
      url: api.user,
      ...opts,
    }),
  };
};

export const updateUser = opts => {
  return {
    type: ACTION_TYPE.UPDATE_USER,
    promise: wrapServer({
      method: 'put',
      url: api.user,
      ...opts,
    }),
  };
};

export const updateUserStatus = opts => {
  return {
    type: ACTION_TYPE.UPDATE_USER_STATUS,
    promise: wrapServer({
      method: 'patch',
      url: api.user,
      ...opts,
    }),
  };
};

export const resetPassword = opts => {
  return {
    type: ACTION_TYPE.RESET_PASSWORD,
    promise: wrapServer({
      method: 'patch',
      url: api.userPassword,
      ...opts,
    }),
  };
};
