import * as React from 'react';
import { Divider } from 'antd';
import mock from 'mockjs';

export const columns = [
  {
    title: '所在区块',
    dataIndex: 'blocknum',
    key: 'blocknum',
  },
  {
    title: '时间戳',
    dataIndex: 'creattime',
    key: 'creattime',
  },
  {
      title: '接口名称',
      dataIndex: 'tablename',
      key: 'tablename',
  },
  {
    title: '查询主键',
    dataIndex: 'keyfield',
    key: 'keyfield',
  },
  {
    title: '哈希值',
    dataIndex: 'datahash',
    key: 'datahash',
    width: 320,
  },
  {
    title: '上传者',
    dataIndex: 'partyname',
    key: 'partyname',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }
];

export const contractColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '类别',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: '地址',
    dataIndex: 'fileName',
    key: 'fileName',
  },
];

export const contractData = [
  {
    name: '德邦',
    version: '证券',
    fileName: '0x6b9fC292B86662642523E8d1889A5FFFb71B80B88',
  },
  {
    name: 'xxx律所',
    version: '律所',
    fileName: '0x429fC292B866658D523E8d1889A5FFFb71B80B88a',
  },
    {
        name: 'xxx会所',
        version: '会所',
        fileName: '0x329fC292B866658D523E8d1889A5FFFb71B80B88a',
    },
    {
        name: 'xxx机构',
        version: '评级',
        fileName: '0x2a9fC292B866658D523E8d1889A5FFFb71B80B88a',
    },
];

export const nodeListColumns = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '类别',
        dataIndex: 'version',
        key: 'version',
    },
    {
        title: '地址',
        dataIndex: 'fileName',
        key: 'fileName',
    },
];

export const nodeListData = [
    {
        name: '德邦',
        version: '证券',
        fileName: '0x6b9fC292B86662642523E8d1889A5FFFb71B80B88',
    },
    {
        name: 'xxx律所',
        version: '律所',
        fileName: '0x429fC292B866658D523E8d1889A5FFFb71B80B88a',
    },
    {
        name: 'xxx会所',
        version: '会所',
        fileName: '0x329fC292B866658D523E8d1889A5FFFb71B80B88a',
    },
    {
        name: 'xxx机构',
        version: '评级',
        fileName: '0x2a9fC292B866658D523E8d1889A5FFFb71B80B88a',
    },
];

export const latestBlockColumns = [
  {
    title: '区块高度',
    dataIndex: 'blocknum',
    key: 'blocknum',
  },
  {
    title: '出块时间',
    dataIndex: 'creattime',
    key: 'creattime',
  },
  {
    title: '区块哈希',
    dataIndex: 'blockhash',
    key: 'blockhash',
  },
  {
    title: '包含交易',
    dataIndex: 'transnum',
    key: 'transnum',
  },
];

export const blockDetail = [
  {
    label: '当前区块哈希',
    value: '2XMS8UH7VL2XTPDYKTS0PYZSKV40NJ0OILE6F0L8CWYA4B2K85',
  },
  {
    label: '出块时间',
    value: '2018-10-10 10:45:46',
  },
  {
    label: '区块高度',
    value: '123456',
  },
  {
    label: '包含交易',
    value: '10',
  },
];

export default {
  columns,
  contractColumns,
  contractData,
  nodeListColumns,
  nodeListData,
  latestBlockColumns,
  blockDetail,
};
