import { wrapServer } from 'utils/Axios';
import api from 'config/api';

export enum ACTION_TYPE {
  QUERY = 'QUERY_DATA_DETAIL',
  QUERY_CARDS = 'QUERY_CARDS',
  QUERY_LAST_BLOCK = 'QUERY_LAST_BLOCK',
  QUERY_BY_KEYFIELD = 'QUERY_BY_KEYFIELD',
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

export const queryBlockNumber = wrapServer({
  url: api.blockNumber,
});

export const queryTransNumber = wrapServer({
  url: api.transNumber,
});

export const queryCardInfo = wrapServer({
  method: 'get',
  url: '/home/cards',
});

export const queryCards = data => {
  return {
    type: ACTION_TYPE.QUERY_CARDS,
    promise: Promise.all([queryBlockNumber, queryTransNumber, queryCardInfo]),
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

export const queryBykeyfield = data => {
  return {
    type: ACTION_TYPE.QUERY_BY_KEYFIELD,
    promise: wrapServer({
      method: 'post',
      url: api.getTransByKeyfiled,
      data,
    }),
  };
};
