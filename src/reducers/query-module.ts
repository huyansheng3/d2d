import { handle } from 'redux-pack';
import { ACTION_TYPE } from 'actions/query-module';

export const initState = {
  biList: [],
  loading: {},
  apiList: [],
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
    default:
      return state;
  }
};
