import * as React from 'react';
import { Button, Checkbox } from 'antd';

export const columns = [
  {
    title: '选中',
    dataIndex: 'select',
    key: 'select',
    render: (select, record, index) => {
      return <Checkbox />;
    },
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status, record, index) => {
      return status ? '启用' : '停用';
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    render: (operate, record, index) => {
      if (record.status) {
        return <Button type="danger">停用</Button>;
      } else {
        return <Button type="primary">启用</Button>;
      }
    },
  },
];
