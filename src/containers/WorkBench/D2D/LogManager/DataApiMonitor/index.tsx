import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { queryDataApiLog, ACTION_TYPE } from 'actions/log-manager';
import QueryForm from './QueryForm';
import api from 'config/api';

interface Props {
  queryDataApiLog: (opts: any) => any;
  logManager: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryDataApiLog: opts => dispatch(queryDataApiLog(opts)),
});

const mapStateToProps = ({ ui, logManager }) => ({ ui, logManager });

class PackAsset extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.queryDataApiLog({
      url: api.dataInterfaceLog,
    });
  }

  get columns() {
    return [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      },

      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
      },

      // {
      //   title: '类型',
      //   dataIndex: 'dataType',
      //   key: 'dataType',
      // },
      {
        title: '发送方',
        dataIndex: 'sender',
        key: 'sender',
      },
      // {
      //   title: '接收方',
      //   dataIndex: 'acceptor',
      //   key: 'acceptor',
      // },
      {
        title: '操作时间',
        dataIndex: 'logTime',
        key: 'logTime',
      },
    ];
  }
  render() {
    let { ui, logManager } = this.props;
    const { loading } = ui;
    const { dataApiLogs } = logManager;
    return (
      <div>
        <QueryForm
          loading={loading[ACTION_TYPE.QUERY_DATA_API_LOGS]}
          query={this.props.queryDataApiLog}
        />
        <Table
          loading={loading[ACTION_TYPE.QUERY_DATA_API_LOGS]}
          columns={this.columns}
          dataSource={dataApiLogs}
          rowKey="id"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackAsset);
