import * as React from 'react';
import { connect } from 'react-redux';
import QueryForm from './QueryForm';
import { Form, Table, Input, Button, Icon, Tooltip } from 'antd';
import {
  queryVerifyData,
  calculateHash,
  ACTION_TYPE,
} from 'actions/query-module';
import { verifyColumns } from 'config/query-module';
import { FormComponentProps } from 'antd/lib/form';

const Item = Form.Item;
const TextArea = Input.TextArea;

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 10,
  },
};

interface Props extends FormComponentProps {
  queryVerifyData: (data: any) => any;
  calculateHash: (data: any) => any;
  queryModule: any;
}

const mapDispatchToProps = dispatch => ({
  queryVerifyData: value => dispatch(queryVerifyData(value)),
  calculateHash: value => dispatch(calculateHash(value)),
});

const mapStateToProps = ({ queryModule }) => ({ queryModule });

class DataVerify extends React.Component<Props, {}> {
  handleCalculate = e => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        this.props.calculateHash({ data: values });
      }
    });
  };

  componentDidMount() {
    this.props.queryVerifyData({});
  }

  render() {
    let { queryModule, form } = this.props;
    const { verifyData, loading, onlineHash } = queryModule;
    const { getFieldDecorator } = form;

    return (
      <div>
        <div>
          <h2>数据验证</h2>
          <QueryForm
            verifyData={verifyData}
            isLoading={loading[ACTION_TYPE.QUERY_VERIFY_DATA]}
            queryVerifyData={this.props.queryVerifyData}
          />
          <Table
            loading={loading[ACTION_TYPE.QUERY_VERIFY_DATA]}
            columns={verifyColumns}
            dataSource={verifyData}
            rowKey="localHash"
          />
        </div>
        <div>
          <h2>本地明文哈希值计算</h2>
          <Form>
            <Item {...formItemLayout} label="输入">
              {getFieldDecorator('plaintext', {
                rules: [{ required: true, message: '不能为空' }],
              })(<TextArea />)}
            </Item>

            <Item wrapperCol={{ span: 10, offset: 2 }}>
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
              <div>{onlineHash}</div>
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
