import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Progress } from 'antd';
import {
  queryProduct,
  queryPermission,
  ACTION_TYPE,
} from 'actions/query-module';
import QueryForm from './QueryForm';
import ReactTimeout from 'react-timeout';
import api from 'config/api';
import qs from 'qs';
import './index.css';

interface Props {
  queryProduct: (data: any) => any;
  queryPermission: (data: any) => any;
  setInterval: (callback: Function, delay: number) => number;
  clearInterval: (id: number) => any;
  queryModule: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryProduct: value => dispatch(queryProduct(value)),
  queryPermission: value => dispatch(queryPermission(value)),
});

const mapStateToProps = ({ queryModule, ui }) => ({ queryModule, ui });

class Query extends React.Component<Props, any> {
  state = {
    modalVisible: false,
    percent: 0,
    pid: '',
    table: '',
  };

  interval;

  componentDidMount() {
    this.props.queryProduct({});
  }

  handleDownloadClick = record => {
    this.setState({ modalVisible: true, table: record.tableName });
    this.interval = this.props.setInterval(this.updateProgerss, 100);
  };

  onOk = e => {
    this.setState({ modalVisible: false, percent: 0 });
    this.props.clearInterval(this.interval);
  };

  onCancel = e => {
    this.setState({ modalVisible: false, percent: 0 });
    this.props.clearInterval(this.interval);
  };

  updateProgerss = () => {
    if (this.state.percent < 100) {
      this.setState({
        percent: Number(+this.state.percent + +Math.random() * 2).toFixed(1),
      });
    } else {
      this.props.clearInterval(this.interval);
    }
  };

  handleQueryChange = val => {
    this.setState(val);
  };

  render() {
    let { queryModule, ui } = this.props;
    const { products, permission } = queryModule;
    const { loading, isLoading } = ui;

    const permissionColumns = [
      {
        title: '产品名称',
        dataIndex: 'tableName',
        key: 'tableName',
      },
      {
        title: '信息名称',
        dataIndex: 'partyName',
        key: 'partyName',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (type, record, index) => {
          return type === 'interface' ? '数据表' : '文件';
        },
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: '20%',
        render: (operate, record, index) => {
          if (record.type === 'interface') {
            return (
              <Button
                type="primary"
                onClick={() => this.handleDownloadClick(record)}>
                下载
              </Button>
            );
          } else {
            return (
              <Button
                type="primary"
                onClick={() => this.handleDownloadClick(record)}>
                查看
              </Button>
            );
          }
        },
      },
    ];

    console.log(this.state);
    const { table, pid } = this.state;
    const downloadUrl =
      api.productDownload + '?' + qs.stringify({ table: table, pid: pid });
    return (
      <div>
        <QueryForm
          isLoading={loading[ACTION_TYPE.QUERY_PERMISSION]}
          queryPermission={this.props.queryPermission}
          products={products}
          pid={this.state.pid}
          onChange={this.handleQueryChange}
        />

        <Table
          loading={loading[ACTION_TYPE.QUERY_PERMISSION]}
          columns={permissionColumns}
          dataSource={permission}
        />

        <Modal
          visible={this.state.modalVisible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          maskClosable={false}
          footer={null}>
          <div className="download-modal-content">
            <h2>{this.state.percent < 100 ? '导出中' : '导出成功'}</h2>
            <Progress
              className="mt20"
              type="circle"
              percent={this.state.percent}
            />

            <p className="mt20">
              {this.state.percent >= 100 &&
                '导出报表数量220，匹配数据条数220，未匹配数据条数0'}
            </p>

            {this.state.percent >= 100 && (
              <Button className="mt20" type="primary" href={downloadUrl}>
                下载
              </Button>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ReactTimeout(Query)
);
