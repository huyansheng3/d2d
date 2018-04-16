import { wrapServer } from 'utils/Axios';

export enum ACTION_TYPE {
  QUERY = 'QUERY_DATA_DETAIL',
  QUERY_CARDS = 'QUERY_CARDS',
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

export default {
  ACTION_TYPE,
  query,
  queryCards,
};
