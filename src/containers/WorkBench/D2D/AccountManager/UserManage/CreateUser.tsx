import * as React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button } from 'antd';
import { createUser, setUser } from 'actions/user';
import { forEach, isEmpty } from 'lodash';
import { parseInitValue } from 'utils/Utils';
import './index.css';

const FormItem = Form.Item;
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
  createUser: (value: any) => any;
  updateUser: (value: any) => any;
  onCancel: () => any;
  onOk: () => any;
  visible: boolean;
  isLoading?: boolean;
  currentUser: any;
  roles: any;
}

class CreateUser extends React.Component<Props, {}> {
  handleOk = e => {
    const { form, onOk, currentUser } = this.props;

    form.validateFields((errors, values) => {
      if (!errors) {
        if (isEmpty(currentUser)) {
          this.props.createUser({ data: values }).then(({ payload }) => {
            onOk && onOk();
          });
        } else {
          this.props
            .updateUser({ data: { ...currentUser, ...values } })
            .then(({ payload }) => {
              onOk && onOk();
            });
        }
      }
    });
  };

  render() {
    const {
      visible,
      form,
      currentUser,
      onOk,
      onCancel,
      isLoading,
      roles,
    } = this.props;
    const { getFieldDecorator } = form;

    const roleOptions = roles.map(role => {
      return <Option key={role.id}>{role.roleName}</Option>;
    });

    return (
      <Modal
        visible={visible}
        confirmLoading={isLoading}
        onOk={this.handleOk}
        title={isEmpty(currentUser) ? '创建用户' : '更新用户'}
        onCancel={onCancel}>
        <Form layout="vertical">
          <FormItem {...formItemLayout} label="用户名">
            {getFieldDecorator('userName', {
              initialValue: currentUser.userName,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input placeholder="用户名" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="手机">
            {getFieldDecorator('mobile', {
              initialValue: currentUser.mobile,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input placeholder="手机" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="邮箱">
            {getFieldDecorator('email', {
              initialValue: currentUser.email,
              rules: [
                { type: 'email', message: '邮箱格式不正确' },
                { required: true, message: '不能为空' },
              ],
            })(<Input placeholder="邮箱" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="联系人姓名">
            {getFieldDecorator('contactName', {
              initialValue: currentUser.contactName,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input placeholder="联系人姓名" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="角色">
            {getFieldDecorator('roleId', {
              initialValue: parseInitValue(currentUser.roleId),
              rules: [{ required: true, message: '不能为空' }],
            })(<Select placeholder="请选择">{roleOptions}</Select>)}
          </FormItem>

          <FormItem {...formItemLayout} label="企业名称">
            {getFieldDecorator('corporateName', {
              initialValue: currentUser.corporateName,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input disabled={!!currentUser.corporateName} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CreateUser);
