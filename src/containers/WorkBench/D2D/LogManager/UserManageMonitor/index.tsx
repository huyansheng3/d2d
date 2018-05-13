import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { queryUserLogs, ACTION_TYPE } from 'actions/log-manager';
import QueryForm from './QueryForm';
import api from 'config/api';

interface Props {
  queryUserLogs: (opts: any) => any;
  logManager: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryUserLogs: opts => dispatch(queryUserLogs(opts)),
});

const mapStateToProps = ({ ui, logManager }) => ({ ui, logManager });

class PackAsset extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.queryUserLogs({
      url: api.logUser,
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
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
      },

      {
        title: '操作人',
        dataIndex: 'operationUser',
        key: 'operationUser',
      },

      {
        title: '登录时间',
        dataIndex: 'logTime',
        key: 'logTime',
      },
    ];
  }
  render() {
    let { ui, logManager } = this.props;
    const { loading } = ui;
    const { userLogs } = logManager;
    return (
      <div>
        <QueryForm
          loading={loading[ACTION_TYPE.QUERY_USER_LOGS]}
          exportUrl={api.logUserExport}
          query={this.props.queryUserLogs}
        />
        <Table
          loading={loading[ACTION_TYPE.QUERY_USER_LOGS]}
          columns={this.columns}
          dataSource={userLogs}
          rowKey="id"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackAsset);
