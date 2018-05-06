import axios from 'axios';
import { SERVER_HOST as HOST, SERVER_TIMEOUT as TIMEOUT } from 'config';
import { message } from 'antd';
import { isError, get } from 'lodash';
import { STORAGE_KEY, clear } from 'utils/Storage';
// import { store } from 'store';
// import { ACTION_TYPE } from 'utils/Loading';

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

  if (response.data && response.data.msg) {
    return message.error(response.data.msg);
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
  headers: {
    'Content-Type': 'application/json',
  },
});

export const wrapServer = opt => {
  // store.dispatch({});
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
