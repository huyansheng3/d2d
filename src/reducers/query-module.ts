import { handle } from 'redux-pack';
import { ACTION_TYPE } from 'actions/query-module';

export const initState = {
  biList: [],
  loading: {},
  apiList: [],
  verifyData: [],
  onlineHash: '',
  tableList: [],
  queryForm: {},
  queryHash: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.QUERY:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: { ...prevState.loading, [ACTION_TYPE.QUERY]: true },
        }),
        success: prevState => {
          return { ...prevState, biList: action.payload.data };
        },
        finish: prevState => ({
          ...prevState,
          loading: { ...prevState.loading, [ACTION_TYPE.QUERY]: false },
        }),
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
          return { ...prevState, onlineHash: action.payload.data };
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
          return { ...prevState, queryHash: action.payload.data };
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
