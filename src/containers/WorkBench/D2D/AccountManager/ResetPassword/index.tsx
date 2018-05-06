import * as React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  Row,
  Col,
  notification,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { wrapServer } from 'utils/Axios';
import api from 'config/api';
import './index.css';

const Item = Form.Item;
interface Props extends FormComponentProps {
  ui: any;
}

const formItemLayout = {
  wrapperCol: {
    span: 8,
  },
};

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = ({ ui }) => ({ ui });

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
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['newPasswordConfirm'], { force: true }, () => {});
    }
    callback();
  };

  handleSave = e => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        // 执行提交
        const { newPasswordConfirm, ...data } = values;
        wrapServer({
          url: api.changePassword,
          data: data,
        }).then(res => {
          notification.success({
            message: 'Success',
            description: res.data,
          });
        });
      }
    });
  };

  render() {
    let { ui, form } = this.props;
    const { loading } = ui;
    const { getFieldDecorator } = form;
    return (
      <div className="reset-password">
        <Form layout="vertical">
          <Item {...formItemLayout} label="原始密码">
            {getFieldDecorator('oldPassword', {
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
            {getFieldDecorator('newPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入新密码',
                },
                {
                  min: 4,
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
            {getFieldDecorator('newPasswordConfirm', {
              rules: [
                {
                  required: true,
                  message: '请二次输入新密码',
                },
                {
                  min: 4,
                  max: 20,
                  message: '最短6位，最长20位',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </Item>

          <Item>
            <Button
              loading={loading[api.changePassword]}
              type="primary"
              onClick={this.handleSave}>
              保存
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
