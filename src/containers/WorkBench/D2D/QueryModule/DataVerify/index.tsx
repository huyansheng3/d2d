import * as React from 'react';
import { connect } from 'react-redux';
import QueryForm from './QueryForm';
import { Form, Table, Input, Button, Icon, Tooltip } from 'antd';
import {
  queryVerifyData,
  calculateHash,
  queryTableList,
  queryHash,
  ACTION_TYPE,
} from 'actions/query-module';
import { verifyColumns } from 'config/query-module';
import { FormComponentProps } from 'antd/lib/form';
import { forEach, head } from 'lodash';
import qs from 'qs';

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
  queryModule: any;
}

const mapDispatchToProps = dispatch => ({
  queryHash: value => dispatch(queryHash(value)),
  queryVerifyData: value => dispatch(queryVerifyData(value)),
  queryTableList: value => dispatch(queryTableList(value)),
  calculateHash: value => dispatch(calculateHash(value)),
});

const mapStateToProps = ({ queryModule }) => ({ queryModule });

class DataVerify extends React.Component<Props, { queryFileds: {} }> {
  state = { queryFileds: {} };

  handleQueryFormChange = changedFields => {
    this.setState(({ queryFileds }) => ({
      queryFileds: { ...queryFileds, ...changedFields },
    }));
  };

  handleCalculate = e => {
    const { form } = this.props;
    form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        const queryData = {};
        forEach(this.state.queryFileds, (filed, key) => {
          queryData[key] = filed.value;
        });

        const data = {
          ...queryData,
          ...values,
        };

        this.props.calculateHash({
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(data),
        });
      }
    });
  };

  componentDidMount() {
    this.props.queryTableList({});
  }

  validateJSON = (rule, value, callback) => {
    try {
      JSON.parse(value);
    } catch (e) {
      callback('格式不正确，必须是 JSON 格式');
    }
    callback();
  };

  render() {
    let { queryModule, form } = this.props;
    const { verifyData, loading, localHash, tableList, onlineHashs = [] } = queryModule;
    const { getFieldDecorator } = form;

    const dataSource = verifyData.map((item, index) => ({ ...item, onlineHash: onlineHashs[index] }))

    if (localHash && dataSource && dataSource.length) {
      dataSource[0] = { ...dataSource[0], localHash: localHash }
    }

    return (
      <div className="data-verify">
        <div>
          <h2>数据验证</h2>
          <QueryForm
            verifyData={verifyData}
            isLoading={loading[ACTION_TYPE.QUERY_VERIFY_DATA]}
            queryVerifyData={this.props.queryVerifyData}
            queryHash={this.props.queryHash}
            tableList={tableList}
            onChange={this.handleQueryFormChange}
          />
          <Table
            loading={loading[ACTION_TYPE.QUERY_VERIFY_DATA]}
            columns={verifyColumns}
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

            <Item >
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create()(DataVerify)
);
