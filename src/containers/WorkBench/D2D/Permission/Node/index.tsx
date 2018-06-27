import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import {
  queryProduct,
  queryNode,
  createNode,
  updateNode,
  ACTION_TYPE,
} from 'actions/query-module';
import QueryForm from './QueryForm';
import api from 'config/api';
import { head } from 'lodash';
import CreateNode from './CreateNode';
import { RowSelectionType } from 'antd/lib/table';

interface Props {
  queryProduct: (data: any) => any;
  queryNode: (opts: any) => any;
  updateNode: (opts: any) => any;
  createNode: (opts: any) => any;
  queryModule: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryProduct: data => dispatch(queryProduct(data)),
  queryNode: opts => dispatch(queryNode(opts)),
  createNode: opts => dispatch(createNode(opts)),
  updateNode: opts => dispatch(updateNode(opts)),
});

const mapStateToProps = ({ ui, queryModule }) => ({ ui, queryModule });

type nodeType = {};

const initNode: nodeType = {};

class PackAsset extends React.Component<Props, {}> {
  state = {
    currentNode: initNode,
    modalVisible: false,
    selectedRowKeys: [],
    isCreate: false,
  };

  componentDidMount() {
    this.props.queryProduct({});
    this.props.queryNode({ params: { corporateInfo: '' } });
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
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '节点名称',
        dataIndex: 'partyName',
        key: 'partyName',
      },
      {
        title: 'IP地址',
        dataIndex: 'ipAddress',
        key: 'ipAddress',
      },
      {
        title: '端口',
        dataIndex: 'port',
        key: 'port',
      },
      {
        title: '企业信息',
        dataIndex: 'corporateInfo',
        key: 'corporateInfo',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
    ];
  }
  render() {
    let { ui, queryModule } = this.props;
    const { loading } = ui;
    const { products, nodes } = queryModule;

    const rowSelectionType: RowSelectionType = 'radio';

    const rowSelection = {
      hideDefaultSelections: true,
      type: rowSelectionType,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          currentNode: head(selectedRows),
        });
      },
    };

    return (
      <div>
        <QueryForm
          currentNode={this.state.currentNode}
          loading={loading[ACTION_TYPE.QUERY_NODE]}
          query={this.props.queryNode}
          products={products}
          updateModalVisile={this.updateModalVisile}
        />
        <Table
          rowSelection={rowSelection}
          loading={loading[ACTION_TYPE.QUERY_NODE]}
          columns={this.columns}
          dataSource={nodes}
        />

        <CreateNode
          isCreate={this.state.isCreate}
          createNode={this.props.createNode}
          updateNode={this.props.updateNode}
          currentNode={this.state.currentNode}
          isLoading={
            loading[ACTION_TYPE.CREATE_NODE] || loading[ACTION_TYPE.UPDATE_NODE]
          }
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
)(PackAsset);
