import * as React from 'react';
import { Divider } from 'antd';

export const columns = [{
    title: '发布日期',
    dataIndex: 'issueDate',
    key: 'issueDate',
//    render: text => <a href="#">{text}</a>,
}, {
    title: '资产类型',
    dataIndex: 'type',
    key: 'type',
}, {
    title: '发票金额(万元)(含税)',
    dataIndex: 'capitalAmount',
    key: 'capitalAmount',
}, {
    title: '融资金额(万元)',
    dataIndex: 'issueAmount',
    key: 'issueAmount',
}, {
    title: '核心企业',
    dataIndex: 'jobberCorpName',
    key: 'jobberCorpName',
}, {
    title: '上游企业',
    dataIndex: 'debtorCorpName',
    key: 'debtorCorpName',
}, {
    title: '预期融资日期',
    dataIndex: 'issueExpiry',
    key: 'issueExpiry',
}, {
    title: '状态',
    dataIndex: 'issueStatus',
    key: 'issueStatus',
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="#">我要买</a>
            <Divider type="vertical" />
            <a href="#">查看资产</a>
            <Divider type="vertical" />
            <a href="#">查看公司</a>
        </span>
    ),
}];


export default {
    columns
}
