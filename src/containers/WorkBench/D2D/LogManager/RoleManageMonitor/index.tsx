import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import { queryRoleLogs, ACTION_TYPE } from 'actions/log-manager';
import QueryForm from './QueryForm';
import api from 'config/api';

interface Props {
  queryRoleLogs: (opts: any) => any;
  logManager: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryRoleLogs: opts => dispatch(queryRoleLogs(opts)),
});

const mapStateToProps = ({ ui, logManager }) => ({ ui, logManager });

class PackAsset extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.queryRoleLogs({
      url: api.logRole,
    });
  }

  get columns() {
    return [
      {
        title: '序号',
        dataIndex: 'sernums',
        key: 'sernums',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        render: (userName, record, index) => {
          return userName || '-';
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
      },
      {
        title: '角色',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: '操作时间',
        dataIndex: 'logTime',
        key: 'logTime',
      },
      // {
      //   title: '操作',
      //   dataIndex: 'operate',
      //   key: 'operate',
      //   render: (operate, record, index) => {
      //     return <Button type="primary">查看</Button>;
      //   },
      // },
    ];
  }
  render() {
    let { ui, logManager } = this.props;
    const { loading } = ui;
    const { roleLogs } = logManager;
    return (
      <div>
        <QueryForm
          loading={loading[ACTION_TYPE.QUERY_ROLE_LOGS]}
          exportUrl={api.logRoleExport}
          query={this.props.queryRoleLogs}
        />
        <Table
          loading={loading[ACTION_TYPE.QUERY_ROLE_LOGS]}
          columns={this.columns}
          dataSource={roleLogs}
          rowKey="id"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackAsset);
