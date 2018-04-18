import { wrapServer } from 'utils/Axios';
import api from 'config/api';

export enum ACTION_TYPE {
  QUERY = 'QUERY_BI_QUERY',
  QUERY_API_LIST = 'QUERY_API_LIST',
  QUERY_VERIFY_DATA = 'QUERY_VERIFY_DATA',
  CALCULATE_HASH = 'CALCULATE_HASH',
  QUERY_TABLE_LIST = 'QUERY_TABLE_LIST',
  QUERY_HASH = 'QUERY_HASH',
}

export const queryBi = data => {
  return {
    type: ACTION_TYPE.QUERY,
    promise: wrapServer({
      method: 'get',
      url: '/query-module/bi-query',
      data,
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
