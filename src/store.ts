import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { createBrowserHistory } from 'history';

import thunk from 'redux-thunk';
import reducers from 'reducers';
import { storageMiddleware } from 'utils/Storage';
import { loadingMiddleware } from 'utils/Loading';

export const history = createBrowserHistory();
const middleware = routerMiddleware(history);

let newMiddleware = applyMiddleware(
  thunk,
  loadingMiddleware,
  reduxPackMiddleware,
  storageMiddleware,
  middleware
);

// TODO: remove dev tools or split env
const create =
  typeof window !== 'undefined' && (window as any).devToolsExtension
    ? (window as any).devToolsExtension({ actionsBlacklist: ['@@redux-form'] })(
        createStore
      )
    : createStore;

export const store = newMiddleware(create)(reducers);
