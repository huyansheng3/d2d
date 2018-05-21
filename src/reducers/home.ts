import { handle } from 'redux-pack';
import { ACTION_TYPE } from 'actions/home';
import moment from 'moment';

const home = {
  dataDetail: [],
  loading: {},
  cards: [],
  lastBlock: [],
  blockByLast: [],
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
          const [block, trans, queryCardInfo] = action.payload;
          const cards = {
            ...queryCardInfo.data,
            block: block.data || 0,
            exchange: trans.data || 0,
          };
          return { ...prevState, cards: cards };
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
          loading: {
            ...prevState.loading,
            [ACTION_TYPE.QUERY_LAST_BLOCK]: true,
          },
        }),
        success: prevState => {
          const newLastBlock = action.payload.data.sort((a, b) => {
            return moment(a.creattime).isBefore(b.creattime);
          });
          return { ...prevState, lastBlock: newLastBlock };
        },
        finish: prevState => ({
          ...prevState,
          loading: {
            ...prevState.loading,
            [ACTION_TYPE.QUERY_LAST_BLOCK]: false,
          },
        }),
      });
    case ACTION_TYPE.SEARCH:
      return handle(state, action, {
        success: prevState => {
          return { ...prevState, lastBlock: action.payload.data };
        },
      });
    case ACTION_TYPE.QUERY_BLOCK_BY_LAST:
      return handle(state, action, {
        success: prevState => {
          return { ...prevState, blockByLast: action.payload.data };
        },
      });
    default:
      return state;
  }
};
