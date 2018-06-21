import axios from 'axios';
import { SERVER_HOST as HOST, SERVER_TIMEOUT as TIMEOUT } from 'config';
import { message } from 'antd';
import { isError, get } from 'lodash';
import { STORAGE_KEY, clear } from 'utils/Storage';
import { store } from 'store';

export const error = response => {
  if (isError(response) && get(response, 'response.status') === 401) {
    // 无权限，清除用户信息
    // clear(STORAGE_KEY.USER);
    // window.location.reload();
  }

  if (isError(response)) {
    message.error(response.message);
    throw response;
  }

  const errorMsg = response.data ? response.data.data || response.data.msg : '';
  if (errorMsg) {
    message.error(errorMsg);
    throw errorMsg;
  }

  switch (typeof response.data) {
    case 'string':
      message.error(response.data);
      break;
    default:
      message.error('请求处理错误');
  }
  throw new Error(response.data);
};

export const server = axios.create({
  baseURL: HOST,
  timeout: TIMEOUT,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

server.interceptors.request.use(
  function(config) {
    const state = (store as any).getState();
    const { user } = state;
    const { token } = user.user;
    const newConfig = {
      ...config,
      params: { ...config.params, token: token },
    };
    return newConfig;
  },
  function(axiosError) {
    // Do something with request error
    return Promise.reject(axiosError);
  }
);

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

export const wrapServer = opt => {
  return server
    .request({
      method: 'post',
      ...opt,
    })
    .then(response => {
      const data = response.data;
      if (data.code === 0 || data.code === '0') {
        return data;
      } else {
        return Promise.reject(response);
      }
    })
    .catch(info => {
      return error(info);
    });
};
