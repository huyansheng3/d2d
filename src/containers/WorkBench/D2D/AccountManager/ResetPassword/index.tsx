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
  labelCol: { span: 2 },
  wrapperCol: {
    span: 8,
  },
};

const mapDispatchToProps = dispatch => ({
  query: value => dispatch(query(value)),
});

const mapStateToProps = ({ assets }) => ({ assets });

class ResetPassword extends React.Component<Props, {}> {
  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('new_password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true }, () => {});
    }
    callback();
  };

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
          <Item {...formItemLayout} label="原始密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入原始密码',
                },
              ],
            })(<Input type="password" />)}
          </Item>
          <Item
            {...formItemLayout}
            label={
              <span>
                新密码&nbsp;
                <Tooltip
                  title={
                    <span>
                      有大小写字母和数字组成<br />最短6位，最长20位
                    </span>
                  }>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }>
            {getFieldDecorator('new_password', {
              rules: [
                {
                  required: true,
                  message: '请输入新密码',
                },
                {
                  min: 6,
                  max: 20,
                  message: '最短6位，最长20位',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input type="password" />)}
          </Item>
          <Item {...formItemLayout} label="确认新密码">
            {getFieldDecorator('new_password_comfirm', {
              rules: [
                {
                  required: true,
                  message: '请二次输入新密码',
                },
                {
                  min: 6,
                  max: 20,
                  message: '最短6位，最长20位',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </Item>

          <Item wrapperCol={{ span: 8, offset: 2 }}>
            <Button type="primary" onClick={this.handleSave}>
              保存
            </Button>
            <Button type="primary" className="rpoperate__cancal">
              取消
            </Button>
          </Item>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create()(ResetPassword)
);
