import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import { default as user } from './user';
import { default as market } from './market';
import { default as assets } from './assets';
import { default as enterprise } from './enterprise';

export default combineReducers({
  user,
  market,
  assets,
  enterprise,
  router,
});
