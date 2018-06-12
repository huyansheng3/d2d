import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import {
  queryGoods,
  createGoodsOrder,
  deliverGoods,
  ACTION_TYPE,
} from 'actions/order';
import QueryForm from './QueryForm';
import api from 'config/api';
import { head } from 'lodash';
import CreateNode from './CreateNode';
import { RowSelectionType } from 'antd/lib/table';
import { find, forEach } from 'lodash';
import { options } from './QueryForm';
import { creditOptions } from './CreateNode';
interface Props {
  queryGoods: (opts: any) => any;
  createGoodsOrder: (opts: any) => any;
  deliverGoods: (opts: any) => any;
  order: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryGoods: opts => dispatch(queryGoods(opts)),
  createGoodsOrder: opts => dispatch(createGoodsOrder(opts)),
  deliverGoods: opts => dispatch(deliverGoods(opts)),
});

const mapStateToProps = ({ ui, order }) => ({ ui, order });

type nodeType = {
  orderNo?: string;
  goodsState?: string;
};

const initNode: nodeType = {};

class Seller extends React.Component<Props, {}> {
  state = {
    currentOrder: initNode,
    modalVisible: false,
    selectedRowKeys: [],
    queryFileds: {},
  };

  componentDidMount() {
    this.props.queryGoods({});
  }

  handleModalClose = state => {
    this.setState(state);
    this.query();
  };

  updateModalVisile = state => {
    this.setState(state);
  };

  get columns() {
    return [
      {
        title: '买方',
        dataIndex: 'buyerParty',
        key: 'buyerParty',
        render: buyerParty => {
          const opt = find(creditOptions, { value: buyerParty }) || {};
          return opt.label || buyerParty;
        },
      },
      {
        title: '卖方',
        dataIndex: 'sellerParty',
        key: 'sellerParty',
        render: sellerParty => {
          const opt = find(creditOptions, { value: sellerParty }) || {};
          return opt.label || sellerParty;
        },
      },
      {
        title: '信任方',
        dataIndex: 'creditParty',
        key: 'creditParty',
        render: creditParty => {
          const opt = find(creditOptions, { value: creditParty }) || {};
          return opt.label || creditParty;
        },
      },
      {
        title: '所有方',
        dataIndex: 'ownerParty',
        key: 'ownerParty',
        render: ownerParty => {
          const opt = find(creditOptions, { value: ownerParty }) || {};
          return opt.label || ownerParty;
        },
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 100,
      },
      {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit',
      },
      {
        title: '单价',
        dataIndex: 'goodsAmt',
        key: 'goodsAmt',
        width: 100,
      },
      {
        title: '订单号',
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: 200,
      },
      {
        title: 'Token ID',
        dataIndex: 'tokenTransId',
        key: 'tokenTransId',
      },
      {
        title: '交易ID',
        dataIndex: 'transactionId',
        key: 'transactionId',
      },

      {
        title: '订单状态',
        dataIndex: 'goodsState',
        key: 'goodsState',
        width: 150,
        render: goodsState => {
          const opt = find(options, { value: goodsState }) || {};
          return opt.label || goodsState;
        },
      },
      {
        title: '总金额',
        dataIndex: 'totalAmt',
        key: 'totalAmt',
        width: 100,
      },
      {
        title: '收货地址',
        dataIndex: 'buyerAddress',
        key: 'buyerAddress',
        width: 100,
      },
      {
        title: '收货日期',
        dataIndex: 'deliveryDate',
        key: 'deliveryDate',
        width: 100,
      },
    ];
  }

  deliverGoods = e => {
    const { orderNo, goodsState } = this.state.currentOrder;
    this.props.deliverGoods({ params: { orderNo, goodsState } }).then(() => {
      this.query();
    });
  };

  handleStateChange = changedFields => {
    this.setState({
      queryFileds: { ...this.state.queryFileds, ...changedFields },
    });
  };

  query = () => {
    const queryData = {};
    forEach(this.state.queryFileds, (filed, key) => {
      queryData[key] = filed.value;
    });

    this.props.queryGoods({
      params: queryData,
    });
  };

  render() {
    let { ui, order } = this.props;
    const { loading } = ui;
    const { orders } = order;

    const rowSelectionType: RowSelectionType = 'radio';

    const rowSelection = {
      hideDefaultSelections: true,
      type: rowSelectionType,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          currentOrder: head(selectedRows),
        });
      },
    };

    return (
      <div>
        <QueryForm
          queryGoods={this.props.queryGoods}
          deliverGoods={this.deliverGoods}
          currentOrder={this.state.currentOrder}
          loading={loading[ACTION_TYPE.QUERY_GOODS]}
          updateModalVisile={this.updateModalVisile}
          deliverLoading={loading[ACTION_TYPE.DELIVER_GOODS]}
          onStateChange={this.handleStateChange}
        />

        <Table
          rowSelection={rowSelection}
          loading={loading[ACTION_TYPE.QUERY_GOODS]}
          columns={this.columns}
          dataSource={orders}
          rowKey="orderNo"
          scroll={{ x: 2500 }}
        />

        <CreateNode
          createGoodsOrder={this.props.createGoodsOrder}
          isLoading={loading[ACTION_TYPE.CREATE_GOODS_ORDER]}
          onCancel={this.handleModalClose}
          onOk={this.handleModalClose}
          visible={this.state.modalVisible}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seller);
