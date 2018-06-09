import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { queryLoginLogs, ACTION_TYPE } from 'actions/log-manager';
import QueryForm from './QueryForm';
import api from 'config/api';

interface Props {
  queryLoginLogs: (opts: any) => any;
  logManager: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryLoginLogs: opts => dispatch(queryLoginLogs(opts)),
});

const mapStateToProps = ({ ui, logManager }) => ({ ui, logManager });

class PackAsset extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.queryLoginLogs({
      url: api.loginLogs,
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
        title: '登录角色',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: '类型',
        dataIndex: 'loginType',
        key: 'loginType',
      },
      {
        title: '登录时间',
        dataIndex: 'logTime',
        key: 'logTime',
      },
      {
        title: 'ip',
        dataIndex: 'ip',
        key: 'ip',
        render: ip => {
          return ip || '-';
        },
      },
    ];
  }
  render() {
    let { ui, logManager } = this.props;
    const { loading } = ui;
    const { loginLogs } = logManager;
    return (
      <div>
        <QueryForm
          loading={loading[ACTION_TYPE.QUERY_LOGIN_LOGS]}
          exportUrl={api.loginLogsExport}
          query={this.props.queryLoginLogs}
        />
        <Table
          loading={loading[ACTION_TYPE.QUERY_LOGIN_LOGS]}
          columns={this.columns}
          dataSource={loginLogs}
          rowKey="id"
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackAsset);
