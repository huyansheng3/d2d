import { handle } from 'redux-pack';
import { ACTION_TYPE } from 'actions/home';

const home = {
  dataDetail: [],
  loading: {},
  cards: [],
  lastBlock: []
};

export default (state = home, action) => {
  switch (action.type) {
    case ACTION_TYPE.QUERY:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: { ...prevState.loading, [ACTION_TYPE.QUERY]: true },
        }),
        success: prevState => {
          return { ...prevState, dataDetail: action.payload.data };
        },
        finish: prevState => ({
          ...prevState,
          loading: { ...prevState.loading, [ACTION_TYPE.QUERY]: false },
        }),
      });
    case ACTION_TYPE.QUERY_CARDS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: { ...prevState.loading, [ACTION_TYPE.QUERY_CARDS]: true },
        }),
        success: prevState => {
          return { ...prevState, cards: action.payload.data };
        },
        finish: prevState => ({
          ...prevState,
          loading: { ...prevState.loading, [ACTION_TYPE.QUERY_CARDS]: false },
        }),
      });
    case ACTION_TYPE.QUERY_LAST_BLOCK:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: { ...prevState.loading, [ACTION_TYPE.QUERY_LAST_BLOCK]: true },
        }),
        success: prevState => {
          return { ...prevState, lastBlock: action.payload.data };
        },
        finish: prevState => ({
          ...prevState,
          loading: { ...prevState.loading, [ACTION_TYPE.QUERY_LAST_BLOCK]: false },
        }),
      });
    default:
      return state;
  }
};
