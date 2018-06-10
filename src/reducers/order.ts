import { handle } from 'redux-pack';
import { ACTION_TYPE } from 'actions/order';
import { findIndex } from 'lodash';
import produce from 'immer';

const initState = {
  orders: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.QUERY_GOODS:
      return handle(state, action, {
        success: prevState => {
          return { ...prevState, orders: action.payload.data };
        },
      });
    case ACTION_TYPE.CREATE_GOODS_ORDER:
      return handle(state, action, {
        success: prevState => {
          const newOrders = produce(prevState.orders, draft => {
            draft.push(action.payload.data);
          });
          return {
            ...prevState,
            orders: newOrders,
          };
        },
      });

    case ACTION_TYPE.CONFIRM_GOODS_ORDER:
      return handle(state, action, {
        // success: prevState => {
        //   const index = findIndex(prevState.orders, {
        //     id: action.payload.data,
        //   });
        //   const newOrders = produce(prevState.orders, draf => {
        //     draf[index].status = true;
        //   });
        //   return {
        //     ...prevState,
        //     orders: newOrders,
        //   };
        // },
      });
    case ACTION_TYPE.DELIVER_GOODS:
      return handle(state, action, {
        // success: prevState => {
        //   const index = findIndex(prevState.orders, {
        //     id: action.payload.data,
        //   });
        //   const newOrders = produce(prevState.orders, draf => {
        //     draf[index].status = true;
        //   });
        //   return {
        //     ...prevState,
        //     orders: newOrders,
        //   };
        // },
      });

    default:
      return state;
  }
};
