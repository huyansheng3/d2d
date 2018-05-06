import { store } from 'store';
import { server } from 'utils/Axios';
import { ACTION_TYPE } from 'utils/Loading';

server.interceptors.request.use(
  function(config) {
    store.dispatch({
      type: ACTION_TYPE.SET_LOADING_BEGIN,
      key: config.url,
    });
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
server.interceptors.response.use(
  function(response) {
    const { config } = response;
    store.dispatch({
      type: ACTION_TYPE.SET_LOADING_FINISH,
      key: config.url,
    });
    return response;
  },
  function(error) {
    const { config } = error;
    store.dispatch({
      type: ACTION_TYPE.SET_LOADING_FINISH,
      key: config.url,
    });
    // Do something with response error
    return Promise.reject(error);
  }
);
