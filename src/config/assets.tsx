import * as React from 'react';
import { default as AssetsAction } from 'components/TableAction/AssetsAction';
export const columns = [{
    title: '资产编号',
    dataIndex: 'id',
    key: 'id'
}, {
    title: '上游企业名称',
    dataIndex: 'upCompany',
    key: 'upCompany'
}, {
    title: '发票原始金额(万元)',
    dataIndex: 'amount',
    key: 'amount'
}, {
    title: '开票日期',
    dataIndex: 'billingDate',
    key: 'billingDate'
}, {
    title: '账期(天)',
    dataIndex: 'payment',
    key: 'payment'
}, {
    title: '资产状态',
    dataIndex: 'status',
    key: 'status'
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => <AssetsAction rowData={text}/>
}]
