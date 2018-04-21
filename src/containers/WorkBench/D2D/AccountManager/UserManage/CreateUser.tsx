import * as React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button } from 'antd';
import { createUser, setUser } from 'actions/user';
import CreateAssets from './CreateAssets';
import { forEach } from 'lodash';
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
  setUser: (value: any) => any;
  onCancel: () => any;
  onOk: () => any;
  user: any;
  visible: boolean;
  isLoading?: boolean;
}

const mapDispatchToProps = dispatch => ({
  createUser: value => dispatch(createUser(value)),
  setUser: value => dispatch(setUser(value)),
});

const mapStateToProps = ({ user }) => ({ user });

class CreateUser extends React.Component<Props, {}> {
  handleCreate = e => {
    const { form, onOk } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        this.props.createUser({ data: values }).then(({ payload }) => {
          onOk && onOk();
        });
      }
    });
  };

  render() {
    const { visible, form, user, onOk, onCancel, isLoading } = this.props;
    const { newUser } = user;
    const { getFieldDecorator } = form;
    return (
      <Modal visible={visible} onOk={onOk} onCancel={onCancel} footer={null}>
        <Form layout="vertical">
          <FormItem {...formItemLayout} label="用户名">
            {getFieldDecorator('userName', {
              initialValue: newUser.userName,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input placeholder="用户名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="状态">
            {getFieldDecorator('status', {
              initialValue: newUser.status,
              rules: [{ required: true, message: '不能为空' }],
            })(
              <Select placeholder="请选择">
                {options.map(option => (
                  <Option key={option.value}>{option.label}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="邮箱">
            {getFieldDecorator('email', {
              initialValue: newUser.email,
              rules: [
                { type: 'email', message: '邮箱格式不正确' },
                { required: true, message: '不能为空' },
              ],
            })(<Input placeholder="邮箱" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="姓名">
            {getFieldDecorator('name', {
              initialValue: newUser.name,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input placeholder="姓名" />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              loading={isLoading}
              onClick={this.handleCreate}>
              创建
            </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create({
    onFieldsChange(props: Props, changedFields) {
      const data = {};
      forEach(changedFields, (field, key) => {
        data[key] = field.value;
      });
      props.setUser(data);
    },
  })(CreateUser)
);
