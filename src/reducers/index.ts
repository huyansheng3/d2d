import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import { default as user } from './user';
import { default as market } from './market';
import { default as assets } from './assets';
import { default as enterprise } from './enterprise';
import { default as home } from './home';
import { default as queryModule } from './query-module';
import { default as ui } from './ui';
import { default as accountManager } from './account-manager';

export default combineReducers({
  user,
  market,
  assets,
  enterprise,
  router,
  home,
  queryModule,
  ui,
  accountManager,
});
