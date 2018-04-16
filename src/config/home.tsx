import * as React from 'react';
import { Divider } from 'antd';

export const columns = [
  {
    title: '所在区块',
    dataIndex: 'block',
    key: 'block',
  },
  {
    title: '时间戳',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: '查询主键',
    dataIndex: 'queryPrimaryKey',
    key: 'queryPrimaryKey',
  },
  {
    title: '哈希值',
    dataIndex: 'hashValue',
    key: 'hashValue',
  },
  {
    title: '上传者',
    dataIndex: 'uploader',
    key: 'uploader',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '是否有效',
    dataIndex: 'isValid',
    key: 'isValid',
    render: (isValid, record, index) => (isValid ? '是' : '否'),
  },
];

export default {
  columns,
};
