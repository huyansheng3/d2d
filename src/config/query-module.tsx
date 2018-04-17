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

export const verifyColumns = [
  {
    title: '主键',
    dataIndex: 'primaryKey',
    key: 'primaryKey',
  },
  {
    title: '明文数据',
    dataIndex: 'plaintext',
    key: 'plaintext',
  },
  {
    title: '本地哈希',
    dataIndex: 'localHash',
    key: 'localHash',
  },
  {
    title: '链上哈希',
    dataIndex: 'onlineHash',
    key: 'onlineHash',
    render: (onlineHash, record, index) => {
      if (!onlineHash) {
        return '-';
      }
      return onlineHash;
    },
  },
  {
    title: '比对结果',
    dataIndex: 'result',
    key: 'result',
    render: (result, record, index) => {
      if (!record.onlineHash) {
        return '-';
      }
      return record.onlineHash === record.localHash ? '匹配' : '不匹配';
    },
  },
];

export default {
  biColumns,
  apiColumns,
  verifyColumns,
};
