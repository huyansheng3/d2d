import { LIFECYCLE, KEY } from 'redux-pack';

export enum ACTION_TYPE {
  SET_LOADING_BEGIN = 'SET_LOADING_START',
  SET_LOADING_FINISH = 'SET_LOADING_FINISH',
}

export const loadingMiddleware = store => next => action => {
  if (!action.meta) {
    return next(action);
  }

  switch (action.meta[KEY.LIFECYCLE]) {
    case LIFECYCLE.START:
      store.dispatch({ type: ACTION_TYPE.SET_LOADING_BEGIN, key: action.type });
      break;
    case LIFECYCLE.SUCCESS:
      store.dispatch({
        type: ACTION_TYPE.SET_LOADING_FINISH,
        key: action.type,
      });
      break;
    case LIFECYCLE.FAILURE:
      store.dispatch({
        type: ACTION_TYPE.SET_LOADING_FINISH,
        key: action.type,
      });
      break;
    default:
      store.dispatch({
        type: ACTION_TYPE.SET_LOADING_FINISH,
        key: action.type,
      });
      break;
  }

  return next(action);
};
