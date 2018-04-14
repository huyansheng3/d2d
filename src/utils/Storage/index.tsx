import { ACTION_TYPE as USER_ACTION } from 'actions/user';

export enum STORAGE_KEY {
  USER = 'user',
}

const storage = (key, { payload }) => {
  if (payload) {
    let { data } = payload;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }
};

const clear = key => {
  return localStorage.removeItem(key);
};

export const initState = key => {
  let state = localStorage.getItem(key);
  if (state) {
    return JSON.parse(state);
  }
  return {};
};

export const storageMiddleware = store => next => action => {
  switch (action.type) {
    case USER_ACTION.LOGIN:
      storage(STORAGE_KEY.USER, action);
      break;
    case USER_ACTION.LOGOUT:
      clear(STORAGE_KEY.USER);
      break;
    default:
  }
  return next(action);
};
