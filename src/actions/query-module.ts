import { wrapServer } from 'utils/Axios';

export enum ACTION_TYPE {
  QUERY = 'QUERY_BI_QUERY',
  QUERY_API_LIST = 'QUERY_API_LIST',
  QUERY_VERIFY_DATA = 'QUERY_VERIFY_DATA',
  CALCULATE_HASH = 'CALCULATE_HASH',
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

export const queryVerifyData = ({ data }) => {
  return {
    type: ACTION_TYPE.QUERY_VERIFY_DATA,
    promise: wrapServer({
      method: 'get',
      url: '/query-module/verify-data',
      data,
    }),
  };
};

export const calculateHash = ({ data }) => {
  return {
    type: ACTION_TYPE.CALCULATE_HASH,
    promise: wrapServer({
      method: 'get',
      url: '/query-module/calculate-hash',
      data,
    }),
  };
};

export default {
  ACTION_TYPE,
  queryBi,
  queryApiList,
  queryVerifyData,
  calculateHash,
};
