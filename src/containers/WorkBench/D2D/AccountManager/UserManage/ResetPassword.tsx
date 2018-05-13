import * as React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button, Tooltip, Icon, notification } from 'antd';
import { createUser, setUser } from 'actions/user';
import { forEach, isEmpty } from 'lodash';
import './index.css';

const Item = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  //    labelCol: {
  //        xs: { span: 2 },
  //        sm: { span: 2 },
  //    },
  //    wrapperCol: {
  //        sm: { span: 4 },
  //    },
};

const options = [
  {
    label: '启用',
    value: 1,
  },
  {
    label: '停用',
    value: 0,
  },
];

interface Props extends FormComponentProps {
  onCancel: (e: any) => any;
  onOk: (e: any) => any;
  visible: boolean;
  isLoading?: boolean;
  resetPassword: (opts: any) => any;
  currentUser: any;
}

class CreateUser extends React.Component<Props, {}> {
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

  handleOk = e => {
    const { form, onOk, currentUser } = this.props;

    form.validateFields((errors, values) => {
      if (!errors) {
        this.props
          .resetPassword({
            data: {
              newPassword: values.newPassword,
            },
            params: {
              id: currentUser.id,
            },
          })
          .then(({ payload }) => {
            notification.success({
              message: 'Success',
              description: payload.data,
            });
            onOk && onOk(e);
          });
      }
    });
  };

  render() {
    const { visible, form, onOk, onCancel, isLoading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="重置密码"
        confirmLoading={isLoading}
        onOk={this.handleOk}
        onCancel={onCancel}>
        <Form layout="vertical">
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
                  message: '最短4位，最长20位',
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
                  message: '最短4位，最长20位',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CreateUser);
