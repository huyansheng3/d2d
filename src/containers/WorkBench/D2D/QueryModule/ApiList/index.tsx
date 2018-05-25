import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Card, Row, Col } from 'antd';
import {
  queryApiList,
  queryProduct,
  queryPermission,
  queryNodeMainTain,
  ACTION_TYPE,
} from 'actions/query-module';
import { find } from 'lodash';
import QueryForm from './QueryForm';

interface Props {
  queryModule: any;
  queryApiList: (data: any) => any;
  queryProduct: (data: any) => any;
  queryPermission: (data: any) => any;
  queryNodeMainTain: () => any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryProduct: value => dispatch(queryProduct(value)),
  queryPermission: value => dispatch(queryPermission(value)),
  queryNodeMainTain: () => dispatch(queryNodeMainTain()),
});

const mapStateToProps = ({ queryModule, ui }) => ({ queryModule, ui });

type currentType = {
  pid?: number;
  type?: string;
  tableName?: string;
  partyName?: string;
  fromPartyName?: string;
  updateTime?: string;
  operator?: string;
};

interface State {
  modalVisible: boolean;
  current: currentType;
}

const iniCurrent: currentType = {};
class QueryRecord extends React.Component<Props, State> {
  state = {
    modalVisible: false,
    current: iniCurrent,
  };
  componentDidMount() {
    this.props.queryProduct({});
    this.props.queryNodeMainTain();
  }

  handleClick = record => {
    this.setState({ modalVisible: true, current: record });
  };

  handleModalClose = e => {
    this.setState({ modalVisible: false });
  };

  get apiColumns() {
    const {
      apiList,
      loading,
      permission,
      products,
      nodeMainTain,
    } = this.props.queryModule;
    return [
      {
        title: '产品名称',
        dataIndex: 'pid',
        key: 'pid',
        render: pid => {
          const product = find(products, { prjNo: Number(pid) }) || {};
          return product.prjName || '-';
        },
      },
      {
        title: '接口名称',
        dataIndex: 'tableName',
        key: 'tableName',
        render: tableName => {
          return tableName || '文件';
        },
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
        render: (operate, record, index) => {
          return (
            <Button type="primary" onClick={() => this.handleClick(record)}>
              查看
            </Button>
          );
        },
      },
    ];
  }

  render() {
    let { queryModule, ui } = this.props;
    const { apiList, permission, products } = queryModule;
    const { loading } = ui;
    return (
      <div>
        <QueryForm
          products={products}
          queryApiList={this.props.queryApiList}
          queryPermission={this.props.queryPermission}
          isLoading={loading[ACTION_TYPE.QUERY_PERMISSION]}
        />
        <Table
          loading={loading[ACTION_TYPE.QUERY_PERMISSION]}
          columns={this.apiColumns}
          dataSource={permission}
          rowKey="id"
        />

        <Modal
          title="查看"
          width={800}
          visible={this.state.modalVisible}
          onOk={this.handleModalClose}
          onCancel={this.handleModalClose}>
          <div>
            <Card title="概述">
              <Row gutter={8}>
                <Col span={8}>
                  <p>接口编号：{this.state.current.pid}</p>
                  <p>接收方：{this.state.current.fromPartyName}</p>
                </Col>
                <Col span={8}>
                  <p>更新时间： {this.state.current.updateTime}</p>
                </Col>
                <Col span={8}>
                  <p>发送方：{this.state.current.partyName}</p>
                </Col>
              </Row>
            </Card>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryRecord);
