import { handle } from 'redux-pack';
import { STORAGE_KEY, initState } from 'utils/Storage';
import { USER } from 'actions';

const { ACTION_TYPE } = USER;

const initStates = {
  user: initState(STORAGE_KEY.USER),
  users: [],
  loading: {},
  newUser: {},
};

export default (state = initStates, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGIN:
      return handle(state, action, {
        start: prevState => prevState,
        success: prevState => {
          return {
            ...prevState,
            user: action.payload.data,
          };
        },
      });
    case ACTION_TYPE.QUERY_USERS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: {
            ...prevState.loading,
            [ACTION_TYPE.QUERY_USERS]: true,
          },
        }),
        success: prevState => {
          return { ...prevState, users: action.payload.data };
        },
        finish: prevState => ({
          ...prevState,
          loading: {
            ...prevState.loading,
            [ACTION_TYPE.QUERY_USERS]: false,
          },
        }),
      });
    case ACTION_TYPE.CREATE_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: {
            ...prevState.loading,
            [ACTION_TYPE.CREATE_USER]: true,
          },
        }),
        success: prevState => {
          return {
            ...prevState,
            users: [...prevState.users, ...action.payload.data],
          };
        },
        finish: prevState => ({
          ...prevState,
          loading: {
            ...prevState.loading,
            [ACTION_TYPE.CREATE_USER]: false,
          },
        }),
      });
    case ACTION_TYPE.SET_USER:
      return { ...state, newUser: { ...state.newUser, ...action.data } };
    case ACTION_TYPE.LOGOUT:
      return handle(state, action, {
        success: prevState => {
          return { ...initStates, user: {} };
        },
      });
    default:
      return state;
  }
};
