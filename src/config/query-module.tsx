import * as React from 'react';
import { Button, message } from 'antd';
import copy from 'copy-to-clipboard';

export const biColumns = [
  {
    title: '项目名称',
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
    title: '接口名称',
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
    dataIndex: 'keyfield',
    key: 'keyfield',
  },
  {
    title: '明文数据',
    dataIndex: 'data',
    key: 'data',
    render: (data, record, index) => {
      try {
        const text = JSON.stringify(data, null, 2) || '';
        return (
          <div>
            {text.split('\n').map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </div>
        );
      } catch (e) {
        console.error(e);
      }
      return '-';
    },
  },
  {
    title: '本地哈希',
    dataIndex: 'localHash',
    key: 'localHash',
    render: (localHash, record, index) => {
      if (localHash) {
        return localHash;
      }
      return '-';
    },
  },
  {
    title: '链上哈希',
    dataIndex: 'onlineHash',
    key: 'onlineHash',
    render: (onlineHash, record, index) => {
      if (onlineHash && onlineHash.datahash) {
        return onlineHash.datahash;
      }
      return '-';
    },
  },
  {
    title: '比对结果',
    dataIndex: 'result',
    key: 'result',
    render: (result, record, index) => {
      if (!record.onlineHash || !record.localHash) {
        return '-';
      }
      return record.onlineHash.datahash === record.localHash
        ? '匹配'
        : '不匹配';
    },
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    render: (operate, record, index) => {
      return (
        <Button type="primary" onClick={e => handleCopy(record.data)}>
          复制
        </Button>
      );
    },
  },
];

function handleCopy(record) {
  let copyText = '';
  try {
    copyText = JSON.stringify(record, null, 4);
  } catch (e) {
    console.error(e);
  }
  copy(copyText);
  message.success('复制成功！');
}

export default {
  biColumns,
  apiColumns,
  verifyColumns,
};
