// host
// export const SERVER_HOST = 'http://47.97.195.97:9999/c2mart-server/';

const NODE_ENV = process.env.NODE_ENV;

// 本地 mock 的服务器
export const SERVER_HOST =
  NODE_ENV === 'production'
    ? '//block-browser-mock.herokuapp.com/'
    : 'http://localhost:3030';

// 区块浏览器的服务器
export const BLOCK_SERVER_HOST = 'http://47.97.195.97:8096';

// 易工程的服务器
export const EASY_PROJECT_HOST = '//110.80.142.87:10009';

export const ABS = '//47.92.26.19:8082';
export const ABS_HOST = '//47.92.26.19:8093';

export const SERVER_TIMEOUT = 10000;
