import { wrapServer } from 'utils/Axios';
import api from 'config/api';

export enum ACTION_TYPE {
  QUERY_PRODUCT = 'QUERY_PRODUCT',
  QUERY_PERMISSION = 'QUERY_PERMISSION',
  QUERY_PERMISSION_CURRENT = 'QUERY_PERMISSION_CURRENT',
  QUERY_NODE_MAIN_TAIN = 'QUERY_NODE_MAIN_TAIN',
  QUERY_TABLES = 'QUERY_TABLES',
  QUERY_ATTACHMENTS = 'QUERY_ATTACHMENTS',
  QUERY_API_LIST = 'QUERY_API_LIST',
  QUERY_VERIFY_DATA = 'QUERY_VERIFY_DATA',
  CALCULATE_HASH = 'CALCULATE_HASH',
  QUERY_TABLE_LIST = 'QUERY_TABLE_LIST',
  QUERY_HASH = 'QUERY_HASH',
  QUERY_NODE = 'QUERY_NODE',
  CREATE_NODE = 'CREATE_NODE',
  UPDATE_NODE = 'UPDATE_NODE',
  SET_HASH_FORM = 'SET_HASH_FORM',
}

export const queryProduct = data => {
  return {
    type: ACTION_TYPE.QUERY_PRODUCT,
    promise: wrapServer({
      method: 'get',
      url: api.products,
      data,
    }),
  };
};

export const queryPermission = params => {
  return {
    type: ACTION_TYPE.QUERY_PERMISSION,
    promise: wrapServer({
      method: 'get',
      url: api.permission,
      params,
    }),
  };
};

export const queryPermissionCurrent = opts => {
  return {
    type: ACTION_TYPE.QUERY_PERMISSION_CURRENT,
    promise: wrapServer({
      url: api.permissionCurrent,
      ...opts,
    }),
  };
};

export const queryNodeMainTain = () => {
  return {
    type: ACTION_TYPE.QUERY_NODE_MAIN_TAIN,
    promise: wrapServer({
      method: 'get',
      url: api.nodeMainTain,
      withCredentials: true,
    }),
  };
};

export const queryTables = () => {
  return {
    type: ACTION_TYPE.QUERY_TABLES,
    promise: wrapServer({
      method: 'get',
      url: api.tables,
    }),
  };
};

export const queryAttachments = params => {
  return {
    type: ACTION_TYPE.QUERY_ATTACHMENTS,
    promise: wrapServer({
      method: 'get',
      url: api.getAttachment,
      params,
    }),
  };
};

export const queryApiList = ({ data, id }) => {
  const url = id ? `/query-module/api-list/${id}` : '/query-module/api-list';
  return {
    type: ACTION_TYPE.QUERY_API_LIST,
    promise: wrapServer({
      method: 'get',
      url: url,
      data,
    }),
  };
};

export const queryVerifyData = ({ data, params }) => {
  return {
    type: ACTION_TYPE.QUERY_VERIFY_DATA,
    promise: wrapServer({
      method: 'get',
      url: api.verifyData,
      data,
      params,
    }),
  };
};

export const calculateHash = options => {
  return {
    type: ACTION_TYPE.CALCULATE_HASH,
    promise: wrapServer({
      method: 'post',
      url: api.calculateHash,
      ...options,
    }),
  };
};

export const queryTableList = ({ data }) => {
  return {
    type: ACTION_TYPE.QUERY_TABLE_LIST,
    promise: wrapServer({
      method: 'get',
      url: api.tableList,
      data,
    }),
  };
};

export const queryHash = ({ data }) => {
  return {
    type: ACTION_TYPE.QUERY_HASH,
    promise: wrapServer({
      method: 'post',
      url: api.getHashByKeyfield,
      data,
    }),
  };
};

export const queryNode = opts => {
  return {
    type: ACTION_TYPE.QUERY_NODE,
    promise: wrapServer({
      method: 'get',
      url: api.nodeMainTain,
      ...opts,
    }),
  };
};

export const createNode = opts => {
  return {
    type: ACTION_TYPE.CREATE_NODE,
    promise: wrapServer({
      url: api.nodeMainTain,
      ...opts,
    }),
  };
};

export const updateNode = opts => {
  return {
    type: ACTION_TYPE.UPDATE_NODE,
    promise: wrapServer({
      method: 'put',
      url: api.nodeMainTain,
      ...opts,
    }),
  };
};

export const setHashForm = form => {
  return {
    type: ACTION_TYPE.SET_HASH_FORM,
    payload: form,
  };
};
