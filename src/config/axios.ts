// host
// export const SERVER_HOST = 'http://47.97.195.97:9999/c2mart-server/';

const APP_ENV = process.env.APP_ENV || 'development';

// 本地 mock 的服务器
export const SERVER_HOST =
  APP_ENV === 'development'
    ? 'http://localhost:3030'
    : '//block-browser-mock.herokuapp.com/';

// 区块浏览器的服务器
export const BLOCK_SERVER_HOST = '//explorer.everchain.net';

// 易工程的服务器
export const EASY_PROJECT_HOST = '//110.80.142.87:10009';

export const SERVER_TIMEOUT = 10000;
