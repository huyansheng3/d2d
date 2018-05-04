import { wrapServer } from 'utils/Axios';
import api from 'config/api';

export enum ACTION_TYPE {
  QUERY_PRODUCT = 'QUERY_PRODUCT',
  QUERY_PERMISSION = 'QUERY_PERMISSION',
  SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT',
  QUERY_API_LIST = 'QUERY_API_LIST',
  QUERY_VERIFY_DATA = 'QUERY_VERIFY_DATA',
  CALCULATE_HASH = 'CALCULATE_HASH',
  QUERY_TABLE_LIST = 'QUERY_TABLE_LIST',
  QUERY_HASH = 'QUERY_HASH',
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
      url: api.getTransByKeyfiled,
      data,
    }),
  };
};
