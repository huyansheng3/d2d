import * as React from 'react';
import {
    LogoutMenuItem
} from 'components/WrapMenuItem';
import {
    UserManage,
    CorpAccount,
    PackAsset,
    QueryRecord
} from 'containers/WorkBench/D2D';
export enum USER_TYPE {
    UNKNOWN = 'UNKNOWN',
    UNAPPROVE = 'UNAPPROVE',
    FUND = 'FUND',
    CORE = 'core',
    SUPPLY = 'SUPPLY',
    ADMIN = 'ADMIN'
}
const corpManage = {
    id: 'corpManage',
    title: <span>企业管理</span>,
    subItems: [{
        id: 'corpAccount',
        title: '企业账户'
    }, {
        id: 'bankAccount',
        title: '银行账户'
        //     }, {
        //         id: 'custodyAccount',
        //         title: '存管账户'
        //     }, {
        //         id: 'eleSignature',
        //         title: '电子签章'
    }]
}
const accountManage = {
    id: 'accountManage',
    title: '账号管理',
    subItems: [{
        id: 'resetPassword',
        title: '修改密码'
    }, {
        id: 'personal',
        title: '个人账户'
    }, {
        id: 'logout',
        title: <LogoutMenuItem/>,
        noLink: true
    }]
}
const messages = {
    id: 'messages',
    title: '消息中心'
}
// APPROVE
const searchTx = {
    id: 'searchTx',
    title: '交易查询'
}
// FUND
const myReceive = {
    id: 'myReceive',
    title: '我的应收'
}
// CORE
const packAsset = {
    id: 'packAsset',
    title: '资产列表'
}

const taskList = {
    id: 'taskList',
    title: '任务列表',
    subItems: [{
        id: 'todoTask',
        title: '待办任务'
    }, {
        id: 'finishedTask',
        title: '已办任务'
    }]
}

const queryRecord = {
    id: 'queryRecord',
    title: '调阅记录'
}

const userManage = {
    id: 'userManage',
    title: '用户管理'
}

const coreCorpManage = {
    id: 'corpManage',
    title: '企业管理',
    subItems: [{
        id: 'corpList',
        title: '查看企业账户'
    }, {
        id: 'maintainList',
        title: '维护上游企业'
    }]
}

export const getMenuItems = role => {
    if (role === null) {
        role = USER_TYPE.ADMIN;
    }
    switch (role) {
        case USER_TYPE.FUND: return [
            corpManage,
            myReceive,
            searchTx,
            accountManage,
            messages
        ];
        case USER_TYPE.CORE: return [
            packAsset,
            taskList,
            queryRecord,
            userManage,
            coreCorpManage,
            accountManage,
            messages
        ];
        default: return [
            corpManage,
            accountManage,
            messages
        ];
    }
}

const Test = () => (<h3>待完成</h3>)

export const getMenuContent = role => {
    switch (role) {
        case USER_TYPE.CORE: return [{
            id: 'packAsset',
            dom: PackAsset,
        }, {
            id: 'queryRecord',
            dom: QueryRecord
        }];
        default: return [{
            'id': 'userManage',
            'dom': UserManage
        }, {
            'id': 'corpAccount',
            'dom': CorpAccount
        }, {
            'id': 'messages',
            'dom': Test
        }]
    }
}

export default {
    getMenuItems,
    getMenuContent
}
