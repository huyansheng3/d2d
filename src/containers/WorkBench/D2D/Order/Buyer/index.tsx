import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { queryGoods, confirmGoodsOrder, ACTION_TYPE } from 'actions/order';
import QueryForm from './QueryForm';
import api from 'config/api';
import { head } from 'lodash';
import CreateNode from './CreateNode';
import { RowSelectionType } from 'antd/lib/table';

interface Props {
  queryGoods: (opts: any) => any;
  confirmGoodsOrder: (opts: any) => any;
  order: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryGoods: opts => dispatch(queryGoods(opts)),
  confirmGoodsOrder: opts => dispatch(confirmGoodsOrder(opts)),
});

const mapStateToProps = ({ ui, order }) => ({ ui, order });

type nodeType = {};

const initNode: nodeType = {};

class Buyer extends React.Component<Props, {}> {
  state = {
    currentOrder: initNode,
    modalVisible: false,
    selectedRowKeys: [],
    isCreate: false,
  };

  componentDidMount() {
    this.props.queryGoods({});
  }

  handleModalClose = state => {
    this.setState(state);
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
      },
      {
        title: '卖方',
        dataIndex: 'sellerParty',
        key: 'sellerParty',
      },
      {
        title: '信任方',
        dataIndex: 'creditParty',
        key: 'creditParty',
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
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
      },
      {
        title: '订单号',
        dataIndex: 'orderNo',
        key: 'orderNo',
      },
      {
        title: '订单状态',
        dataIndex: 'goodsState',
        key: 'goodsState',
      },
      {
        title: '总金额',
        dataIndex: 'totalAmt',
        key: 'totalAmt',
      },
      {
        title: '收货地址',
        dataIndex: 'buyerAddress',
        key: 'buyerAddress',
      },
      {
        title: '收货日期',
        dataIndex: 'deliveryDate',
        key: 'deliveryDate',
      },
    ];
  }
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
          currentOrder={this.state.currentOrder}
          loading={loading[ACTION_TYPE.DELIVER_GOODS]}
          queryGoods={this.props.queryGoods}
          updateModalVisile={this.updateModalVisile}
        />
        <Table
          rowSelection={rowSelection}
          loading={loading[ACTION_TYPE.QUERY_GOODS]}
          columns={this.columns}
          dataSource={orders}
          rowKey="id"
        />

        <CreateNode
          confirmGoodsOrder={this.props.confirmGoodsOrder}
          isLoading={loading[ACTION_TYPE.CONFIRM_GOODS_ORDER]}
          currentOrder={this.state.currentOrder}
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
)(Buyer);
