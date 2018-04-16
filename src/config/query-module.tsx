import * as React from 'react';
import { Divider } from 'antd';

export const biColumns = [
  {
    title: '接口名称',
    dataIndex: 'apiName',
    key: 'apiName',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    render: (operate, record, index) => {
      return (
        <a target="_blank" href={operate}>
          查看
        </a>
      );
    },
  },
];

export const apiColumns = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    key: 'projectName',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    render: (operate, record, index) => {
      return (
        <a target="_blank" href={operate}>
          查看
        </a>
      );
    },
  },
];

export default {
  biColumns,
  apiColumns,
};
