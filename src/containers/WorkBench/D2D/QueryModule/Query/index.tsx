import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Progress, Card, Row, Col } from 'antd';
import {
  queryProduct,
  queryPermission,
  queryAttachments,
  queryNodeMainTain,
  queryTables,
  queryFileTypes,
  setPid,
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
  queryNodeMainTain: () => any;
  setPid: (id) => any;
  queryModule: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryProduct: value => dispatch(queryProduct(value)),
  queryPermission: value => dispatch(queryPermission(value)),
  queryAttachments: params => dispatch(queryAttachments(params)),
  queryTables: () => dispatch(queryTables()),
  queryFileTypes: opts => dispatch(queryFileTypes(opts)),
  queryNodeMainTain: () => dispatch(queryNodeMainTain()),
  setPid: id => dispatch(setPid(id)),
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
    this.props.queryNodeMainTain();
  }

  handleFileClick = record => {
    this.setState({ fileModalVisible: true });
    this.props.queryAttachments({
      pid: record.pid,
      tableName: record.tableName,
    });
  };

  onOk = e => {
    this.setState({ modalVisible: false, percent: 0 });
    this.props.clearInterval(this.interval);
  };

  onCancel = e => {
    this.setState({ modalVisible: false, percent: 0 });
    this.props.clearInterval(this.interval);
  };

  handleQueryChange = val => {
    this.setState(val);
    this.props.setPid(val);
  };

  get filesColumns() {
    const { fileTypes, nodeMainTain } = this.props.queryModule;

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
        title: '上传节点',
        dataIndex: 'upload',
        key: 'upload',
        render: upload => {
          const item = find(nodeMainTain, { partyName: upload }) || {};
          return item.corporateInfo || '-';
        },
      },
      {
        title: '文件类型',
        dataIndex: 'fileType',
        key: 'fileType',
        render: fileType => {
          return (find(fileTypes, { type: fileType }) || {}).typeName || '-';
        },
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
              href={api.calculateHash + '?' + 'hash=' + record.hash}>
              下载
            </Button>
          );
        },
      },
    ];
  }

  render() {
    let { queryModule, ui } = this.props;
    const {
      products,
      permission,
      attachments,
      nodeMainTain,
      pid,
    } = queryModule;
    const { loading, isLoading } = ui;

    const { table } = this.state;

    const permissionColumns = [
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
        title: '发送方',
        dataIndex: 'partyName',
        key: 'partyName',
        render: partyName => {
          const item = find(nodeMainTain, { partyName: partyName }) || {};
          return item.corporateInfo || '-';
        },
      },
      {
        title: '接收方',
        dataIndex: 'fromPartyName',
        key: 'fromPartyName',
        render: fromPartyName => {
          const item = find(nodeMainTain, { partyName: fromPartyName }) || {};
          return item.corporateInfo || '-';
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: '20%',
        render: (operate, record, index) => {
          const downloadUrl =
            api.calculateHash +
            '?' +
            qs.stringify({ stateName: record.tableName, id: pid });

          if (record.type === 'interface') {
            return (
              <Button type="primary" href={downloadUrl}>
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

    return (
      <div>
        <QueryForm
          isLoading={loading[ACTION_TYPE.QUERY_PERMISSION]}
          queryPermission={this.props.queryPermission}
          products={products}
          pid={pid}
          onChange={this.handleQueryChange}
        />

        <Table
          loading={loading[ACTION_TYPE.QUERY_PERMISSION]}
          columns={permissionColumns}
          dataSource={permission}
        />

        <Modal
          title="查看文件"
          width={1200}
          onOk={e => this.setState({ fileModalVisible: false })}
          onCancel={e => this.setState({ fileModalVisible: false })}
          visible={this.state.fileModalVisible}>
          <div>
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
