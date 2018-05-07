import { wrapServer } from 'utils/Axios';
import api from 'config/api';

export enum ACTION_TYPE {
  QUERY_ROLES = 'QUERY_ROLES',
  CREATE_ROLE = 'CREATE_ROLE',
  UPDATE_ROLE = 'UPDATE_ROLE',
  UPDATE_ROLE_STATUS = 'UPDATE_ROLE_STATUS',
  QUERY_CORPORATE = 'QUERY_CORPORATE',
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
