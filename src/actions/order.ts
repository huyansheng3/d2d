import { wrapServer } from 'utils/Axios';
import api from 'config/api';

export enum ACTION_TYPE {
  QUERY_GOODS = 'QUERY_GOODS',
  CREATE_GOODS_ORDER = 'CREATE_GOODS_ORDER',
  CONFIRM_GOODS_ORDER = 'CONFIRM_GOODS_ORDER',
  DELIVER_GOODS = 'DELIVER_GOODS',
}

export const queryGoods = opts => {
  return {
    type: ACTION_TYPE.QUERY_GOODS,
    promise: wrapServer({
      method: 'get',
      url: api.queryGoods,
      ...opts,
    }),
  };
};

export const createGoodsOrder = opts => {
  return {
    type: ACTION_TYPE.CREATE_GOODS_ORDER,
    promise: wrapServer({
      url: api.createGoodsOrder,
      ...opts,
    }),
  };
};

export const confirmGoodsOrder = opts => {
  return {
    type: ACTION_TYPE.CONFIRM_GOODS_ORDER,
    promise: wrapServer({
      url: api.confirmGoodsOrder,
      ...opts,
    }),
  };
};

export const deliverGoods = opts => {
  return {
    type: ACTION_TYPE.DELIVER_GOODS,
    promise: wrapServer({
      method: 'get',
      url: api.deliverGoods,
      ...opts,
    }),
  };
};
