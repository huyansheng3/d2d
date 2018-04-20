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

interface Props extends FormComponentProps {
  createUser: (value: any) => any;
  setUser: (value: any) => any;
  onCancel: () => any;
  onOk: () => any;
  user: any;
  visible: boolean;
}

const mapDispatchToProps = dispatch => ({
  createUser: value => dispatch(createUser(value)),
  setUser: value => dispatch(setUser(value)),
});

const mapStateToProps = ({ user }) => ({ user });

class CreateUser extends React.Component<Props, {}> {
  render() {
    const { visible, form, user, onOk, onCancel } = this.props;
    const { newUser } = user;
    const { getFieldDecorator } = form;
    return (
      <Modal visible={visible} onOk={onOk} onCancel={onCancel}>
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
            })(<Input />)}
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
            <Button type="primary">创建</Button>
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
