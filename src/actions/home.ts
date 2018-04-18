import { wrapServer } from 'utils/Axios';
import api from 'config/api';

export enum ACTION_TYPE {
  QUERY = 'QUERY_DATA_DETAIL',
  QUERY_CARDS = 'QUERY_CARDS',
  QUERY_LAST_BLOCK = 'QUERY_LAST_BLOCK'
}

export const query = data => {
  return {
    type: ACTION_TYPE.QUERY,
    promise: wrapServer({
      method: 'get',
      url: '/home/data-detail',
      data,
    }),
  };
};

export const queryCards = data => {
  return {
    type: ACTION_TYPE.QUERY_CARDS,
    promise: wrapServer({
      method: 'get',
      url: '/home/cards',
      data,
    }),
  };
};

export const queryLastBlock = data => {
  return {
    type: ACTION_TYPE.QUERY_LAST_BLOCK,
    promise: wrapServer({
      method: 'post',
      url: api.getTransByLast,
      data,
    }),
  };
};


