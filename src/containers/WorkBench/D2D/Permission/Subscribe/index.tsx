import * as React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Modal,
  Progress,
  Spin,
  Form,
  Select,
  Row,
  Col,
  Checkbox,
  notification,
} from 'antd';
import { RowSelectionType } from 'antd/lib/table';
import { FormComponentProps } from 'antd/lib/form';
import {
  queryProduct,
  queryPermission,
  queryPermissionCurrent,
  queryNodeMainTain,
  queryTables,
  ACTION_TYPE,
} from 'actions/query-module';
import QueryForm from './QueryForm';
import api from 'config/api';
import { wrapServer } from 'utils/Axios';
import { parseInitValue } from 'utils/Utils';
import qs from 'qs';
import { head, find, map } from 'lodash';
import shortid from 'shortid';
import './index.css';

const Item = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

interface Props extends FormComponentProps {
  queryProduct: (data: any) => any;
  queryPermission: (data: any) => any;
  queryPermissionCurrent: (data: any) => any;
  queryNodeMainTain: () => any;
  queryTables: () => any;
  setInterval: (callback: Function, delay: number) => number;
  clearInterval: (id: number) => any;
  queryModule: any;
  ui: any;
}

interface PermissionCurrent {
  pid: string;
  tableName: string;
  partyName: string;
  fromPartyName: string;
}

type selectedRow = PermissionCurrent | {};

interface State {
  selectedRow: selectedRow;
  modalVisible: boolean;
  table: string;
  pid: string;
  indeterminate: boolean;
  checkAll: boolean;
  tables: Array<String>;
  configLoading: boolean;
}

const mapDispatchToProps = dispatch => ({
  queryProduct: value => dispatch(queryProduct(value)),
  queryPermission: value => dispatch(queryPermission(value)),
  queryPermissionCurrent: value => dispatch(queryPermission(value)),
  queryNodeMainTain: () => dispatch(queryNodeMainTain()),
  queryTables: () => dispatch(queryTables()),
});

const mapStateToProps = ({ queryModule, ui }) => ({ queryModule, ui });

const initSelectedRow: selectedRow = {};

let modalCount = 0;
class Subscribe extends React.Component<Props, State> {
  state = {
    modalVisible: false,
    pid: '',
    table: '',
    selectedRow: initSelectedRow,
    tables: [],
    indeterminate: false,
    checkAll: false,
    configLoading: false,
  };

  componentDidMount() {
    this.props.queryProduct({});
    this.props.queryNodeMainTain();
    this.props.queryTables();
  }

  handleDownloadClick = record => {
    this.setState({ modalVisible: true, table: record.tableName });
  };

  onOk = e => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const { tables } = this.state;

        let data: Array<any> = [];

        const interfaceData = tables.map(table => {
          return {
            type: 'interface',
            tableName: table,
            pid: values.pid,
            toParty: values.toParty,
            fromParty: values.fromParty,
          };
        });

        if (values.files) {
          data = [
            ...interfaceData,
            {
              type: 'file',
              pid: values.pid,
              toParty: values.toParty,
              fromParty: values.fromParty,
            },
          ];
        }
        this.setState({ configLoading: true });
        wrapServer({
          url: api.permissionConfig,
          data: data,
        })
          .then(() => {
            this.setState({
              modalVisible: false,
              configLoading: false,
              tables: [],
            });
            this.props.form.resetFields();
            notification.success({
              message: 'Success',
              description: '权限配置成功',
            });
          })
          .catch(error => {
            this.setState({ configLoading: false });
          });
      }
    });
  };

  onCancel = e => {
    this.setState({ modalVisible: false, tables: [] });
    this.props.form.resetFields();
  };

  handleQueryChange = val => {
    this.setState(val);
  };

  handleConfig = e => {
    this.setState({ modalVisible: true });
  };

  onCheckAllChange = e => {
    this.setState({
      tables: e.target.checked
        ? this.tableCheckboxOptions.map(opt => opt.value)
        : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  get tableCheckboxOptions() {
    const { tables } = this.props.queryModule;
    return tables.map(table => {
      return {
        label: table.productName,
        value: table.type,
      };
    });
  }

  onTablesChange = tables => {
    this.setState({
      tables,
      indeterminate:
        !!tables.length && tables.length < this.tableCheckboxOptions.length,
      checkAll: tables.length === this.tableCheckboxOptions.length,
    });
  };

  render() {
    let { queryModule, ui, form } = this.props;
    const { products, permission, corporateMap, tables } = queryModule;
    const { loading, isLoading } = ui;
    const { getFieldDecorator } = form;

    const permissionColumns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, recored, index) => {
          return index + 1;
        },
      },
      {
        title: '产品名称',
        dataIndex: 'tableName',
        key: 'tableName',
        render: (tableName, record, index) => {
          const tableItem = find(tables, { type: tableName });
          if (tableItem) {
            return tableItem.productName;
          }
          return tableName;
        },
      },
      {
        title: '订阅方',
        dataIndex: 'partyName',
        key: 'partyName',
        render: (partyName, record, index) => {
          return (
            corporateMap[partyName] && corporateMap[partyName].corporateInfo
          );
        },
      },
      {
        title: '被订阅方',
        dataIndex: 'fromPartyName',
        key: 'fromPartyName',
        render: (partyName, record, index) => {
          return (
            corporateMap[partyName] && corporateMap[partyName].corporateInfo
          );
        },
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
    ];

    const type: RowSelectionType = 'radio';
    const rowSelection = {
      hideDefaultSelections: true,
      type: type,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRow: head(selectedRows) });
      },
    };

    const productOptions = products.map(product => {
      return <Option key={product.prjNo}>{product.prjName}</Option>;
    });

    const partyOptions = map(corporateMap, (item, key) => {
      return <Option key={key}>{item.corporateInfo}</Option>;
    });

    return (
      <div>
        <QueryForm
          isLoading={loading[ACTION_TYPE.QUERY_PERMISSION]}
          queryPermission={this.props.queryPermission}
          products={products}
          pid={this.state.pid}
          onChange={this.handleQueryChange}
        />

        <div className="mt10">
          <Button type="primary" onClick={this.handleConfig}>
            配置
          </Button>
        </div>

        <Table
          className="mt10"
          rowSelection={rowSelection}
          loading={loading[ACTION_TYPE.QUERY_PERMISSION]}
          columns={permissionColumns}
          dataSource={permission}
        />

        <Modal
          width={800}
          visible={this.state.modalVisible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          maskClosable={false}
          confirmLoading={this.state.configLoading}
          okText="保存"
          cancelText="关闭"
          title="编辑订阅">
          <div className="config-modal-content">
            <Form>
              <Row gutter={8}>
                <Col span={8}>
                  <Item label="产品名称">
                    {getFieldDecorator('pid', {
                      initialValue: parseInitValue(
                        (this.state.selectedRow as PermissionCurrent).pid
                      ),
                      rules: [
                        {
                          required: true,
                          message: '不能为空',
                        },
                      ],
                    })(<Select>{productOptions}</Select>)}
                  </Item>
                </Col>
                <Col span={8}>
                  <Item label="订阅方名称">
                    {getFieldDecorator('toParty', {
                      initialValue: (this.state
                        .selectedRow as PermissionCurrent).partyName,
                      rules: [
                        {
                          required: true,
                          message: '不能为空',
                        },
                      ],
                    })(<Select placeholder="请选择">{partyOptions}</Select>)}
                  </Item>
                </Col>
                <Col span={8}>
                  <Item label="被订阅方名称">
                    {getFieldDecorator('fromParty', {
                      initialValue: (this.state
                        .selectedRow as PermissionCurrent).fromPartyName,

                      rules: [
                        {
                          required: true,
                          message: '不能为空',
                        },
                      ],
                    })(<Select placeholder="请选择">{partyOptions}</Select>)}
                  </Item>
                </Col>
              </Row>

              <Item label="订阅范围">
                <Row>
                  <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}>
                    表
                  </Checkbox>

                  <CheckboxGroup
                    value={this.state.tables}
                    onChange={this.onTablesChange}
                    options={this.tableCheckboxOptions}
                  />
                </Row>

                <Row>
                  {getFieldDecorator('files', {})(<Checkbox>文件</Checkbox>)}
                </Row>
              </Item>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create()(Subscribe)
);