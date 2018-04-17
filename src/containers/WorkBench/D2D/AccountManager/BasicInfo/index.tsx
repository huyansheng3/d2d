import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Form, Input, Tooltip, Icon, Button, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { query } from 'actions/assets';
import './index.css';

const Item = Form.Item;
interface Props extends FormComponentProps {
  query: (data: any) => any;
  assets: any;
}

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: {
    span: 8,
  },
};

const mapDispatchToProps = dispatch => ({
  query: value => dispatch(query(value)),
});

const mapStateToProps = ({ assets }) => ({ assets });

class BasicInfo extends React.Component<Props, {}> {
  handleSave = e => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        // 执行提交
      }
    });
  };

  render() {
    let { assets, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="reset-password">
        <Form layout="horizontal">
          <Item {...formItemLayout} label="企业信息">
            {getFieldDecorator('enterprise_info', {})(<Input disabled />)}
          </Item>

          <Item {...formItemLayout} label="账号信息">
            {getFieldDecorator('account_info', {})(<Input disabled />)}
          </Item>

          <Item {...formItemLayout} label="区块链地址">
            {getFieldDecorator('block_address', {})(<Input disabled />)}
          </Item>

          <Item {...formItemLayout} label="联系人姓名">
            {getFieldDecorator('contact_name', {
              rules: [{ required: true, message: '不能为空' }],
            })(<Input />)}
          </Item>

          <Item {...formItemLayout} label="手机">
            {getFieldDecorator('contact_phone', {
              rules: [
                { type: 'phone', message: '手机号格式不正确' },
                { required: true, message: '不能为空' },
              ],
            })(<Input />)}
          </Item>

          <Item {...formItemLayout} label="邮箱">
            {getFieldDecorator('contact_email', {
              rules: [
                { type: 'email', message: '邮箱格式不正确' },
                { required: true, message: '不能为空' },
              ],
            })(<Input />)}
          </Item>

          <Item wrapperCol={{ span: 8, offset: 2 }}>
            <Button type="primary" onClick={this.handleSave}>
              保存
            </Button>
          </Item>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create()(BasicInfo)
);
