import * as React from 'react';
import { default as AssetsAction } from 'components/TableAction/AssetsAction';
export const columns = [
  {
    title: '项目名称',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => <AssetsAction rowData={text} />,
  },
];
