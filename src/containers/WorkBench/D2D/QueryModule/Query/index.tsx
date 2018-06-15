import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Progress, Card, Row, Col } from 'antd';
import {
  queryProduct,
  queryPermission,
  queryAttachments,
  queryTables,
  queryFileTypes,
  ACTION_TYPE,
} from 'actions/query-module';
import QueryForm from './QueryForm';
import ReactTimeout from 'react-timeout';
import { find } from 'lodash';
import api from 'config/api';
import qs from 'qs';
import './index.css';

interface Props {
  queryProduct: (data: any) => any;
  queryPermission: (data: any) => any;
  queryAttachments: (params: any) => any;
  queryTables: () => any;
  setInterval: (callback: Function, delay: number) => number;
  clearInterval: (id: number) => any;
  queryFileTypes: (opts) => any;
  queryModule: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryProduct: value => dispatch(queryProduct(value)),
  queryPermission: value => dispatch(queryPermission(value)),
  queryAttachments: params => dispatch(queryAttachments(params)),
  queryTables: () => dispatch(queryTables()),
  queryFileTypes: opts => dispatch(queryFileTypes(opts)),
});

const mapStateToProps = ({ queryModule, ui }) => ({ queryModule, ui });

class Query extends React.Component<Props, any> {
  state = {
    fileModalVisible: false,
    modalVisible: false,
    percent: 0,
    pid: '',
    table: '',
  };

  interval;

  componentDidMount() {
    this.props.queryProduct({});
    this.props.queryTables();
    this.props.queryFileTypes({});
  }

  handleDownloadClick = record => {
    this.setState({ modalVisible: true, table: record.tableName });
    this.interval = this.props.setInterval(this.updateProgerss, 100);
  };

  handleFileClick = record => {
    this.setState({ fileModalVisible: true });
    console.log(record)
    this.props.queryAttachments({ pid: record.pid, tableName: record.tableName });
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

  get filesColumns() {
    return [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (updateOwner, record, index) => {
          return index + 1;
        },
      },
      {
        title: '更新人',
        dataIndex: 'updateOwner',
        key: 'updateOwner',
        render: (updateOwner, record, index) => {
          return updateOwner || 'XXX';
        },
      },
      {
        title: '上传节点',
        dataIndex: 'upload',
        key: 'upload',
      },
      {
        title: '文件类型',
        dataIndex: 'fileType',
        key: 'fileType',
      },
      {
        title: '文件名称',
        dataIndex: 'fileName',
        key: 'fileName',
      },
      {
        title: '更新日期',
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
      },
      {
        title: '哈希值',
        dataIndex: 'hash',
        key: 'hash',
        width: 200,
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (operate, record, index) => {
          return (
            <Button
              type="primary"
              href={api.attachment + '?' + 'hash=' + record.hash}>
              下载
            </Button>
          );
        },
      },
    ];
  }

  render() {
    let { queryModule, ui } = this.props;
    const { products, permission, attachments } = queryModule;
    const { loading, isLoading } = ui;

    const permissionColumns = [
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        render: (productName, record, index) => {
          return productName;
        },
      },
      {
        title: '名称',
        dataIndex: 'apiName',
        key: 'apiName',
        render: apiName => {
          return apiName || '文件';
        },
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (type, record, index) => {
          return type === 'interface' ? '接口' : '文件';
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
                onClick={() => this.handleFileClick(record)}>
                查看
              </Button>
            );
          }
        },
      },
    ];

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

            <div className="mt20">
              {this.state.percent >= 100 && (
                <Button className="mt20" type="primary" href={downloadUrl}>
                  下载
                </Button>
              )}
            </div>
          </div>
        </Modal>

        <Modal
          title="查看文件"
          width={1200}
          onOk={e => this.setState({ fileModalVisible: false })}
          onCancel={e => this.setState({ fileModalVisible: false })}
          visible={this.state.fileModalVisible}>
          <div>
            <Card title="概述">
              <Row gutter={8}>
                <Col span={8}>
                  <p>产品编号：XXXXX</p>
                  <p>查询主键：XXXXX</p>
                </Col>
                <Col span={8}>
                  <p>产品名称：XXXXX</p>
                  <p>创建者：XXXXX</p>
                </Col>
                <Col span={8}>
                  <p>文件名称：XXXXX</p>
                  <p>创建日期：XXXXX</p>
                </Col>
              </Row>
            </Card>

            <Card title="版本信息">
              <Table
                loading={loading[ACTION_TYPE.QUERY_ATTACHMENTS]}
                columns={this.filesColumns}
                dataSource={attachments}
              />
            </Card>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactTimeout(Query));
