import { wrapServer } from 'utils/Axios';

export enum ACTION_TYPE {
  QUERY = 'QUERY_BI_QUERY',
  QUERY_API_LIST = 'QUERY_API_LIST',
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

export const queryApiList = ({ data = {}, id }) => {
  console.log('data', data);
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

export default {
  ACTION_TYPE,
  queryBi,
  queryApiList,
};
