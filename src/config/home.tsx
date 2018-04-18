import * as React from 'react';
import { Divider } from 'antd';
import mock from 'mockjs';

// "blocknum": 71,
// "creattime": "2018-04-17 15:03:44",
// "dataid": "65ADBC821C2F2235044D940E40675AD5E94EB95B39A9568A4554515581748297",
// "keyfield": "18772companyHonorImage",
// "datahash": "F2083FE330AEF6DCD1C9D3905B3E2F858C74EBA40B038517C33B7A8D5A3107B3",
// "partyname": "易工程",
// "address": "0x6df8c05c902b1048",
// "enabled": 1

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

export const contractColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '版本号',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: '文件名',
    dataIndex: 'fileName',
    key: 'fileName',
  },
];

export const contractData = [
  {
    name: 'XXX',
    version: '11',
    fileName: '22.java',
  },
  {
    name: 'XXX',
    version: '11',
    fileName: '22.java',
  },
];

export const nodeListColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '组织',
    dataIndex: 'organization',
    key: 'organization',
  },
  {
    title: 'request',
    dataIndex: 'request',
    key: 'request',
    render: (request, recored, index) => {
      return 'ip' + request;
    },
  },
];

export const nodeListData = [
  {
    name: 'XXX',
    organization: '公司1',
    request: '1.1.1.1',
  },
  {
    name: 'XXX',
    organization: '公司1',
    request: '1.1.1.1',
  },
];

export const latestBlockColumns = [
  {
    title: '区块高度',
    dataIndex: 'blockHeight',
    key: 'blockHeight',
  },
  {
    title: '出块时间',
    dataIndex: 'outputTime',
    key: 'outputTime',
  },
  {
    title: '区块哈希',
    dataIndex: 'blockHash',
    key: 'blockHash',
  },
  {
    title: '包含交易',
    dataIndex: 'containExchange',
    key: 'containExchange',
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
    label: '上一个区块哈希',
    value: '36RUND5GASI3K1W4TXQ72XER9TDD93FS7OEKE681SAHQD6O4HN',
  },
  {
    label: '下一个区块哈希',
    value: 'JNO9NJ54T9HXBT6Q6R45UN7S1Z8L0VAOCC9R8S54UYTVVBIA1',
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
