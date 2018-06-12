import { ACTION_TYPE as USER_ACTION } from 'actions/user';
import moment from 'moment';

export enum STORAGE_KEY {
  USER = 'user',
}

export const storage = (key, { payload }) => {
  if (payload) {
    if (!payload.data) {
      return;
    }

    payload.data = {
      ...payload.data,
      login_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    try {
      localStorage.setItem(key, JSON.stringify(payload.data));
    } catch (error) {
      console.error(error);
    }
  }
};

export const clear = key => {
  return localStorage.removeItem(key);
};

export const initState = key => {
  let state = localStorage.getItem(key) || null;
  if (state) {
    try {
      return JSON.parse(state) || {};
    } catch (e) {
      console.error(e);
    }
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
