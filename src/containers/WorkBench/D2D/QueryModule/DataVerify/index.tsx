import * as React from 'react';
import { connect } from 'react-redux';
import QueryForm from './QueryForm';
import FileQueryForm from './FileQueryForm';
import {
  Form,
  Table,
  Input,
  Button,
  Icon,
  Tooltip,
  message,
  Tabs,
  Upload,
} from 'antd';
import {
  queryVerifyData,
  calculateHash,
  queryTableList,
  queryFileTypes,
  queryTables,
  queryHash,
  setCurrentKey,
  setHashForm,
  queryFileVerify,
  ACTION_TYPE,
} from 'actions/query-module';
import { FormComponentProps } from 'antd/lib/form';
import { forEach, head } from 'lodash';
import qs from 'qs';
import api from 'config/api';
import copy from 'copy-to-clipboard';
import { customRequest } from 'utils/Utils';
import { get } from 'lodash';

function handleCopy(record) {
  let copyText = '';
  try {
    copyText = JSON.stringify(record, null, 4);
  } catch (e) {
    console.error(e);
  }
  copy(copyText);
  message.success('复制成功！');
}

const TabPane = Tabs.TabPane;
const Item = Form.Item;
const TextArea = Input.TextArea;

const formItemLayout = {
  wrapperCol: {
    span: 12,
  },
};

interface Props extends FormComponentProps {
  queryVerifyData: (data: any) => any;
  queryHash: (data: any) => any;
  queryTableList: (data: any) => any;
  calculateHash: (data: any) => any;
  queryTables: () => any;
  setHashForm: (data: any) => any;
  setCurrentKey: (data: any) => any;
  queryFileTypes: (data: any) => any;
  queryFileVerify: (opts: any) => any;
  queryModule: any;
}

const mapDispatchToProps = dispatch => ({
  queryHash: value => dispatch(queryHash(value)),
  queryVerifyData: value => dispatch(queryVerifyData(value)),
  queryTableList: value => dispatch(queryTableList(value)),
  calculateHash: value => dispatch(calculateHash(value)),
  queryTables: () => dispatch(queryTables()),
  setHashForm: value => dispatch(setHashForm(value)),
  setCurrentKey: key => dispatch(setCurrentKey(key)),
  queryFileTypes: key => dispatch(queryFileTypes(key)),
  queryFileVerify: opts => dispatch(queryFileVerify(opts)),
});

const mapStateToProps = ({ queryModule }) => ({ queryModule });

class DataVerify extends React.Component<Props, { queryFileds: {} }> {
  handleQueryFormChange = changedFields => {
    this.props.setHashForm(changedFields);
  };

  handleCalculate = e => {
    const { form, queryModule } = this.props;
    const { hashForm } = queryModule;
    form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        const queryData = {};
        forEach(hashForm, (filed, key) => {
          queryData[key] = filed.value;
        });

        const data = JSON.parse(values.data);
        this.props.setCurrentKey(data.contNo);
        this.props.calculateHash({
          data,
          extraData: data,
          params: queryData,
        });
      }
    });
  };

  componentDidMount() {
    this.props.queryTables();
    this.props.queryFileTypes({});
  }

  get verifyColumns() {
    const { hashForm } = this.props.queryModule;
    const stateName =
      hashForm && hashForm.stateName && hashForm.stateName.value;
    return [
      {
        title: '主键',
        dataIndex: 'keyfield',
        key: 'keyfield',
      },
      {
        title: '明文数据',
        dataIndex: 'data',
        key: 'data',
        render: (data, record, index) => {
          try {
            const text = JSON.stringify(data, null, 2) || '';
            return (
              <div>
                {text.split('\n').map((item, key) => {
                  return (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  );
                })}
              </div>
            );
          } catch (e) {
            console.error(e);
          }
          return '-';
        },
      },
      {
        title: '本地哈希',
        dataIndex: 'localHash',
        key: 'localHash',
        render: (localHash, record, index) => {
          if (localHash) {
            return localHash;
          }
          return '-';
        },
      },
      {
        title: '链上哈希',
        dataIndex: 'onlineHash',
        key: 'onlineHash',
        render: (onlineHash, record, index) => {
          if (onlineHash && onlineHash.datahash) {
            return onlineHash.datahash;
          }
          return '-';
        },
      },
      {
        title: '比对结果',
        dataIndex: 'result',
        key: 'result',
        render: (result, record, index) => {
          if (!record.onlineHash || !record.localHash) {
            return '-';
          }
          return record.onlineHash.datahash === record.localHash
            ? '匹配'
            : '不匹配';
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (operate, record, index) => {
          return (
            <div>
              <Button type="primary" onClick={e => handleCopy(record.data)}>
                复制
              </Button>
              {/* <Button
                href={`${api.calculateHash}?stateName=${stateName}&id=${
                  record.keyfield
                }`}
                className="ml10">
                导出
              </Button> */}
            </div>
          );
        },
      },
    ];
  }

  get fileVerifyColumns() {
    return [
      {
        title: '主键',
        dataIndex: 'keyfield',
        key: 'keyfield',
      },

      {
        title: '文件',
        dataIndex: 'fileName',
        key: 'fileName',
      },

      {
        title: '本地哈希',
        dataIndex: 'localHash',
        key: 'localHash',
        render: (localHash, record, index) => {
          return localHash || '-';
        },
      },
      {
        title: '链上哈希',
        dataIndex: 'hash',
        key: 'hash',
        render: (hash, record, index) => {
          return hash || '-';
        },
      },
      {
        title: '比对结果',
        dataIndex: 'result',
        key: 'result',
        render: (result, record, index) => {
          if (!record.hash || !record.localHash) {
            return '-';
          }
          return record.localHash === record.hash ? '匹配' : '不匹配';
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (operate, record, index) => {
          return (
            <div>
              <Button
                type="primary"
                href={`${api.attachment}?hash=${record.hash}`}>
                下载
              </Button>
            </div>
          );
        },
      },
    ];
  }

  validateJSON = (rule, value, callback) => {
    try {
      JSON.parse(value);
    } catch (e) {
      callback('格式不正确，必须是 JSON 格式');
    }
    callback();
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    let { queryModule, form } = this.props;
    const {
      verifyData,
      loading,
      localHash,
      tableList,
      onlineHashs = {},
      tables,
      hashForm,
      fileTypes,
      fileVerify,
    } = queryModule;
    const { getFieldDecorator } = form;

    const dataSource = verifyData.map((item, index) => ({
      ...item,
      onlineHash: onlineHashs[item.keyfield],
    }));

    const files = form.getFieldValue('files') || [];
    const file = files[0] || {};
    const fileVerifyDataSource = fileVerify.map(item => {
      return {
        ...item,
        localHash: file.response && file.response.data,
      };
    });

    return (
      <div className="data-verify">
        <Tabs defaultActiveKey="data">
          <TabPane tab="数据验证" key="data">
            <div>
              <h2>数据验证</h2>
              <QueryForm
                hashForm={hashForm}
                verifyData={verifyData}
                isLoading={loading[ACTION_TYPE.QUERY_VERIFY_DATA]}
                queryVerifyData={this.props.queryVerifyData}
                queryHash={this.props.queryHash}
                tableList={tables}
                fileTypes={fileTypes}
                onChange={this.handleQueryFormChange}
              />
              <Table
                loading={loading[ACTION_TYPE.QUERY_VERIFY_DATA]}
                columns={this.verifyColumns}
                dataSource={dataSource}
                pagination={false}
                bordered
                rowKey="id"
              />
            </div>
            <div className="mt20">
              <h2>本地明文哈希值计算</h2>
              <Form layout="vertical">
                <Item {...formItemLayout} label="输入">
                  {getFieldDecorator('data', {
                    rules: [
                      { required: true, message: '不能为空' },
                      {
                        validator: this.validateJSON,
                      },
                    ],
                  })(<TextArea autosize={{ minRows: 8, maxRows: 30 }} />)}
                </Item>

                <Item>
                  <Button
                    type="primary"
                    loading={loading[ACTION_TYPE.CALCULATE_HASH]}
                    onClick={this.handleCalculate}>
                    计算
                  </Button>
                  <Tooltip
                    placement="top"
                    title="计算出来的哈希值可与区块浏览器中的数值进行对比，以判断原始数据是否被篡改">
                    <Icon className="ml20" type="question-circle" />
                  </Tooltip>
                </Item>

                <Item {...formItemLayout} label="计算结果">
                  <div>{localHash}</div>
                </Item>
              </Form>
            </div>
          </TabPane>
          <TabPane tab="文件验证" key="file">
            <div>
              <h2>文件验证</h2>
              <FileQueryForm
                hashForm={hashForm}
                isLoading={loading[ACTION_TYPE.FILE_VERIFY]}
                queryVerifyData={this.props.queryFileVerify}
                tableList={tables}
                fileTypes={fileTypes}
                onChange={this.handleQueryFormChange}
              />
              <Table
                loading={loading[ACTION_TYPE.FILE_VERIFY]}
                columns={this.fileVerifyColumns}
                dataSource={fileVerifyDataSource}
                pagination={false}
                bordered
              />
            </div>
            <div className="mt20">
              <h2>本地明文哈希值计算</h2>
              <Form layout="vertical">
                <Item label="上传本地文件" {...formItemLayout}>
                  {getFieldDecorator('files', {
                    initialValue: [],
                    valuePropName: 'fileList',
                    validateTrigger: 'onBlur',
                    getValueFromEvent: this.normFile,
                  })(
                    <Upload.Dragger
                      customRequest={customRequest}
                      multiple
                      name="file"
                      action={api.upload}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">
                        点击或拖拽文件到此区域上传
                      </p>
                      {/*<p className="ant-upload-hint">支持单个或批量上传。</p>*/}

                      <Button type="primary">校验</Button>
                    </Upload.Dragger>
                  )}
                </Item>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(DataVerify));
