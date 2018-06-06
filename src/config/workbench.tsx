import * as React from 'react';
import { LogoutMenuItem } from 'components/WrapMenuItem';
import {
  UserManage,
  Dashboard,
  QueryModule,
  AccountManager,
  OpMonitor,
  LogManager,
  Permission,
  DataModule,
} from 'containers/WorkBench/D2D';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { store } from 'store';
import { find } from 'lodash';

// 显示页面的 mapping,简单处理就直接用 name 匹配了，一个个写前端的 id 了。
const pagesMap = [
  {
    id: 1,
    title: '文件上传',
  },
  {
    id: 2,
    title: '产品查询',
  },
  {
    id: 3,
    title: '数据验证',
  },
  {
    id: 4,
    title: '接口列表',
  },
  {
    id: 5,
    title: '角色管理',
  },
  {
    id: 6,
    title: '用户管理',
  },
  {
    id: 7,
    title: '订阅权限配置',
  },
  {
    id: 8,
    title: '节点配置',
  },
  {
    id: 9,
    title: '登录日志',
  },
  {
    id: 10,
    title: '数据接口日志',
  },
  {
    id: 11,
    title: '角色管理日志',
  },
  {
    id: 12,
    title: '用户管理日志',
  },
];

export enum USER_TYPE {
  UNKNOWN = 'UNKNOWN',
  UNAPPROVE = 'UNAPPROVE',
  FUND = 'FUND',
  CORE = '超级管理员',
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

const dataModule: subMenuConfig = {
  id: 'dataModule',
  MenuIcon: <Icon type="database" />,
  title: '数据模块',
  subItems: [
    // {
    //   id: 'dataUpload',
    //   title: '数据上传',
    // },
    {
      id: 'fileUpload',
      title: '文件上传',
    },
  ],
};

export const queryModule: subMenuConfig = {
  id: 'queryModule',
  MenuIcon: <Icon type="search" />,
  title: '查询模块',
  subItems: [
    {
      id: 'query',
      title: '产品查询',
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
      id: 'roleManage',
      title: '角色管理',
    },
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

export const permission: subMenuConfig = {
  id: 'permission',
  MenuIcon: <Icon type="team" />,
  title: '权限模块',
  subItems: [
    {
      id: 'subscribe',
      title: '订阅权限配置',
    },
    // {
    //   id: 'upload',
    //   title: '上传权限配置',
    // },
    {
      id: 'node',
      title: '节点配置',
    },
  ],
};

export const logManager: subMenuConfig = {
  id: 'logManager',
  MenuIcon: <Icon type="inbox" />,
  title: '日志管理',
  subItems: [
    {
      id: 'login',
      title: '登录日志',
    },
    {
      id: 'upload',
      title: '上传日志',
    },

    {
      id: 'dataApi',
      title: '数据接口日志',
    },

    {
      id: 'roleManage',
      title: '角色管理日志',
    },
    {
      id: 'userManage',
      title: '用户管理日志',
    },
  ],
};

const blockBrowserEntry: subMenuConfig = {
  id: 'blockBrowserEntry',
  noLink: true,
  MenuIcon: <Icon type="link" />,
  title: (
    <Link className="block-browser-item" to="/">
      区块浏览器入口
    </Link>
  ),
};

const allMenuItems = [
  dashboard,
  dataModule,
  queryModule,
  accountManager,
  permission,
  logManager,
  blockBrowserEntry,
];

export const getMenuItems = roleName => {
  const state = (store as any).getState();
  const { user } = state;
  const { visiblePages } = user.user;

  if (!visiblePages) {
    return allMenuItems;
  }

  const showPages = pagesMap.filter(
    item => visiblePages.indexOf(item.id) !== -1
  );

  const showMenuitems = allMenuItems.map(item => {
    if (find(showPages, { title: item.title })) {
      // 一旦配了父级菜单，则这个菜单肯定显示
      return item;
    }

    let newSubItems;
    if (item.subItems) {
      newSubItems = item.subItems.filter(subItem =>
        find(showPages, { title: subItem.title })
      );
    }

    if (newSubItems && newSubItems.length) {
      // 一旦子级菜单匹配了，就显示父级+匹配的子级菜单
      return {
        ...item,
        subItems: newSubItems || item.subItems,
      };
    }

    return null;
  });

  return showMenuitems.filter(item => item).concat(blockBrowserEntry);
};

const Test = () => <h3>待完成</h3>;

export const getMenuContent = roleName => {
  return [
    {
      id: 'dashboard',
      dom: Dashboard,
    },
    {
      id: 'dataModule',
      dom: DataModule,
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
      id: 'permission',
      dom: Permission,
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
};

export default {
  getMenuItems,
  getMenuContent,
};
