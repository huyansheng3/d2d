import axios from 'axios';
import { SERVER_HOST as HOST, SERVER_TIMEOUT as TIMEOUT } from 'config';
import { message } from 'antd';

export const error = ({ response = { data: '请求处理错误' } }) => {
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
  return server
    .request({
      method: 'post',
      ...opt,
    })
    .then(response => response.data)
    .catch(info => error(info));
};
