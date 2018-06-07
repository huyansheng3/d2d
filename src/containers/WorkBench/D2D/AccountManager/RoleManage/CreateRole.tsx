import * as React from 'react';
import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button, Checkbox } from 'antd';
import { forEach, isEmpty } from 'lodash';
import './index.css';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const formItemLayout = {
  wrapperCol: { span: 12 },
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
  createRole: (value: any) => any;
  updateRole: (value: any) => any;
  onCancel: () => any;
  onOk: () => any;
  visible: boolean;
  loading?: boolean;
  currentRole: any;
  roles: any;
  corporateInfo: any;
  isCreateMode: boolean;
}

class CreateRole extends React.Component<Props, {}> {
  state = {
    corpIndeterminate: false,
    corpCheckAll: false,
    roleIndeterminate: false,
    roleCheckAll: false,
  };

  handleOk = e => {
    const {
      form,
      createRole,
      updateRole,
      onOk,
      currentRole,
      isCreateMode,
    } = this.props;

    form.validateFields((errors, values) => {
      if (!errors) {
        if (isCreateMode) {
          createRole(values).then(payload => {
            form.resetFields();
            onOk && onOk();
          });
        } else {
          updateRole({ ...currentRole, ...values }).then(payload => {
            form.resetFields();
            onOk && onOk();
          });
        }
      }
    });
  };

  handleCorpChange = values => {
    this.setState({
      corpIndeterminate:
        values.length && values.length < this.corporateInfoOptions.length,
      corpCheckAll: values.length === this.corporateInfoOptions.length,
    });
  };

  onCorpAllChange = e => {
    this.setState({
      corpIndeterminate: false,
      corpCheckAll: e.target.checked,
    });

    this.props.form.setFieldsValue({
      corpManage: e.target.checked
        ? this.corporateInfoOptions.map(item => item.value)
        : [],
    });
  };

  handleRoleChange = values => {
    this.setState({
      roleIndeterminate:
        values.length && values.length < this.roleOptions.length,
      roleCheckAll: values.length === this.roleOptions.length,
    });
  };

  onRoleAllChange = e => {
    this.setState({
      roleIndeterminate: false,
      roleCheckAll: e.target.checked,
    });
    this.props.form.setFieldsValue({
      allRole: e.target.checked ? this.roleOptions.map(item => item.value) : [],
    });
  };

  get roleOptions() {
    return this.props.roles.map(role => ({
      label: role.roleName,
      value: role.id,
    }));
  }

  get corporateInfoOptions() {
    return this.props.corporateInfo.map(item => ({
      label: item.corporateName,
      value: item.id,
    }));
  }

  render() {
    const {
      visible,
      form,
      onOk,
      onCancel,
      loading,
      currentRole,
      roles,
      corporateInfo,
      isCreateMode,
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        width={800}
        onOk={this.handleOk}
        okText={isCreateMode ? '创建' : '更新'}
        cancelText="取消"
        onCancel={onCancel}
        confirmLoading={loading}
        title="角色维护">
        <Form layout="vertical">
          <FormItem {...formItemLayout} label="角色名称">
            {getFieldDecorator('roleName', {
              initialValue: isCreateMode ? undefined : currentRole.roleName,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="可见页面">
            <Checkbox
              indeterminate={this.state.corpIndeterminate}
              onChange={this.onCorpAllChange}
              checked={this.state.corpCheckAll}>
              全部企业
            </Checkbox>

            {getFieldDecorator('corpManage', {
              initialValue: isCreateMode ? undefined : currentRole.corpManage,
              rules: [{ required: true, message: '不能为空' }],
            })(
              <CheckboxGroup
                onChange={this.handleCorpChange}
                options={this.corporateInfoOptions}
              />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="可控制角色">
            <Checkbox
              indeterminate={this.state.roleIndeterminate}
              onChange={this.onRoleAllChange}
              checked={this.state.roleCheckAll}>
              全部角色
            </Checkbox>

            {getFieldDecorator('allRole', {
              initialValue: isCreateMode ? undefined : currentRole.allRole,
            })(
              <CheckboxGroup
                onChange={this.handleRoleChange}
                options={this.roleOptions}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CreateRole);
