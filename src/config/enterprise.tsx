import * as React from 'react';
import { Divider } from 'antd';
export const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '资产编号',
    dataIndex: '',
    key: '',
  },
  {
    title: '上游企业名称',
    dataIndex: '',
    key: '',
  },
  {
    title: '发票原始金额(万元)',
    dataIndex: '',
    key: '',
  },
  {
    title: '开票日期',
    dataIndex: '',
    key: '',
  },
  {
    title: '账期(天)',
    dataIndex: '',
    key: '',
  },
  {
    title: '资产状态',
    dataIndex: '',
    key: '',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="#">编辑</a>
        <Divider type="vertical" />
        <a href="#">查看</a>
      </span>
    ),
  },
];
