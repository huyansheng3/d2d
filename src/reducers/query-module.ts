import { handle } from 'redux-pack';
import { ACTION_TYPE } from 'actions/query-module';
import { findIndex } from 'lodash';
export const initState = {
  products: [],
  permission: [],
  loading: {},
  apiList: [],
  verifyData: [],
  localHash: '',
  tableList: [],
  queryForm: {},
  onlineHashs: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.QUERY_PRODUCT:
      return handle(state, action, {
        success: prevState => {
          const products = action.payload.data || [];
          const filterProducts = products.filter(
            (item, index) =>
              findIndex(products, { prjNo: item.prjNo }) === index
          );
          return { ...prevState, products: filterProducts };
        },
      });
    case ACTION_TYPE.QUERY_PERMISSION:
      return handle(state, action, {
        success: prevState => {
          return { ...prevState, permission: action.payload.data };
        },
      });
    case ACTION_TYPE.QUERY_PERMISSION:
      return handle(state, action, {
        success: prevState => {
          return { ...prevState, permission: action.payload.data };
        },
      });
    case ACTION_TYPE.QUERY_API_LIST:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: { ...prevState.loading, [ACTION_TYPE.QUERY_API_LIST]: true },
        }),
        success: prevState => {
          return { ...prevState, apiList: action.payload.data };
        },
        finish: prevState => {
          return {
            ...prevState,
            loading: {
              ...prevState.loading,
              [ACTION_TYPE.QUERY_API_LIST]: false,
            },
          };
        },
      });
    case ACTION_TYPE.QUERY_VERIFY_DATA:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: {
            ...prevState.loading,
            [ACTION_TYPE.QUERY_VERIFY_DATA]: true,
          },
        }),
        success: prevState => {
          return { ...prevState, verifyData: action.payload.data };
        },
        finish: prevState => {
          return {
            ...prevState,
            loading: {
              ...prevState.loading,
              [ACTION_TYPE.QUERY_VERIFY_DATA]: false,
            },
          };
        },
      });
    case ACTION_TYPE.CALCULATE_HASH:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: { ...prevState.loading, [ACTION_TYPE.CALCULATE_HASH]: true },
        }),
        success: prevState => {
          return { ...prevState, localHash: action.payload.data };
        },
        finish: prevState => {
          return {
            ...prevState,
            loading: {
              ...prevState.loading,
              [ACTION_TYPE.CALCULATE_HASH]: false,
            },
          };
        },
      });
    case ACTION_TYPE.QUERY_TABLE_LIST:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: {
            ...prevState.loading,
            [ACTION_TYPE.QUERY_TABLE_LIST]: true,
          },
        }),
        success: prevState => {
          return { ...prevState, tableList: action.payload.data };
        },
        finish: prevState => {
          return {
            ...prevState,
            loading: {
              ...prevState.loading,
              [ACTION_TYPE.QUERY_TABLE_LIST]: false,
            },
          };
        },
      });
    case ACTION_TYPE.QUERY_HASH:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: {
            ...prevState.loading,
            [ACTION_TYPE.QUERY_HASH]: true,
          },
        }),
        success: prevState => {
          return { ...prevState, onlineHashs: action.payload.data };
        },
        finish: prevState => {
          return {
            ...prevState,
            loading: {
              ...prevState.loading,
              [ACTION_TYPE.QUERY_HASH]: false,
            },
          };
        },
      });
    default:
      return state;
  }
};
