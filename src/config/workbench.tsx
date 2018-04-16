import * as React from 'react';
import { LogoutMenuItem } from 'components/WrapMenuItem';
import {
  UserManage,
  CorpAccount,
  QueryRecord,
  Dashboard,
  QueryModule,
  AccountManager,
  OpMonitor,
  LogManager,
} from 'containers/WorkBench/D2D';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

export enum USER_TYPE {
  UNKNOWN = 'UNKNOWN',
  UNAPPROVE = 'UNAPPROVE',
  FUND = 'FUND',
  CORE = 'core',
  SUPPLY = 'SUPPLY',
  ADMIN = 'ADMIN',
}

const messages = {
  id: 'messages',
  title: '消息中心',
};
// APPROVE
const searchTx = {
  id: 'searchTx',
  title: '交易查询',
};
// FUND
const myReceive = {
  id: 'myReceive',
  title: '我的应收',
};

type subMenuConfig = {
  id: string;
  title: string | JSX.Element;
  MenuIcon?: JSX.Element;
  noLink?: boolean;
  subItems?: Array<subMenuConfig>;
};

// CORE
const dashboard: subMenuConfig = {
  id: 'dashboard',
  MenuIcon: <Icon type="dashboard" />,
  title: '工作台',
};

export const queryModule: subMenuConfig = {
  id: 'queryModule',
  MenuIcon: <Icon type="search" />,
  title: '查询模块',
  subItems: [
    {
      id: 'biQuery',
      title: '报表查询',
    },
    {
      id: 'dataVerify',
      title: '数据验证',
    },
    {
      id: 'apiList',
      title: '接口列表',
    },
  ],
};

export const accountManager: subMenuConfig = {
  id: 'accountManager',
  MenuIcon: <Icon type="user" />,
  title: '账号管理',
  subItems: [
    {
      id: 'userManage',
      title: '用户管理',
    },
    {
      id: 'basicInfo',
      title: '基本信息',
    },
    {
      id: 'resetPassword',
      title: '修改密码',
    },
  ],
};

export const opMonitor: subMenuConfig = {
  id: 'opMonitor',
  MenuIcon: <Icon type="eye" />,
  title: '运维监控',
  subItems: [
    {
      id: 'localMonitor',
      title: '本地节点监控',
    },
    {
      id: 'blockMonitor',
      title: '区块链节点监控',
    },
  ],
};

export const logManager: subMenuConfig = {
  id: 'logManager',
  MenuIcon: <Icon type="inbox" />,
  title: '日志管理',
  subItems: [
    {
      id: 'loginMonitor',
      title: '登录日志',
    },
    {
      id: 'operateMonitor',
      title: '操作日志',
    },
  ],
};

const blockBrowserEntry: subMenuConfig = {
  id: 'blockBrowserEntry',
  noLink: true,
  MenuIcon: <Icon type="link" />,
  title: <Link to="/">区块浏览器入口</Link>,
};

export const getMenuItems = role => {
  if (role === null) {
    role = USER_TYPE.ADMIN;
  }
  switch (role) {
    case USER_TYPE.FUND:
      return [myReceive, searchTx, accountManager, messages];
    case USER_TYPE.CORE:
      return [
        dashboard,
        queryModule,
        accountManager,
        opMonitor,
        logManager,
        blockBrowserEntry,
      ];
    default:
      return [accountManager, messages];
  }
};

const Test = () => <h3>待完成</h3>;

export const getMenuContent = role => {
  switch (role) {
    case USER_TYPE.CORE:
      return [
        {
          id: 'dashboard',
          dom: Dashboard,
        },
        {
          id: 'queryModule',
          dom: QueryModule,
        },
        {
          id: 'accountManager',
          dom: AccountManager,
        },
        {
          id: 'opMonitor',
          dom: OpMonitor,
        },
        {
          id: 'logManager',
          dom: LogManager,
        },
      ];
    default:
      return [
        {
          id: 'userManage',
          dom: UserManage,
        },
        {
          id: 'corpAccount',
          dom: CorpAccount,
        },
        {
          id: 'messages',
          dom: Test,
        },
      ];
  }
};

export default {
  getMenuItems,
  getMenuContent,
};
