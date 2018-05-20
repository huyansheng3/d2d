import * as React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button } from 'antd';
import { forEach, isEmpty } from 'lodash';
import { parseInitValue } from 'utils/Utils';

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
  createNode: (value: any) => any;
  updateNode: (value: any) => any;
  onCancel: () => any;
  onOk: () => any;
  visible: boolean;
  isLoading?: boolean;
  currentNode: any;
}

class CreateNode extends React.Component<Props, {}> {
  handleOk = e => {
    const { form, onOk, currentNode } = this.props;

    form.validateFields((errors, values) => {
      if (!errors) {
        if (isEmpty(currentNode)) {
          this.props.createNode({ data: values }).then(({ payload }) => {
            onOk && onOk();
          });
        } else {
          this.props
            .updateNode({ data: { ...currentNode, ...values } })
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
      currentNode,
      onOk,
      onCancel,
      isLoading,
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        confirmLoading={isLoading}
        onOk={this.handleOk}
        title={isEmpty(currentNode) ? '创建节点' : '编辑节点'}
        onCancel={onCancel}>
        <Form layout="vertical">
          <FormItem {...formItemLayout} label="产品名称">
            {getFieldDecorator('partyName', {
              initialValue: currentNode.partyName,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input placeholder="产品名称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="ip 地址">
            {getFieldDecorator('ipAdress', {
              initialValue: currentNode.ipAdress,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input placeholder="ip 地址" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="端口">
            {getFieldDecorator('port', {
              initialValue: currentNode.port,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input placeholder="邮箱" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="企业信息">
            {getFieldDecorator('corporateInfo', {
              initialValue: currentNode.corporateInfo,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input placeholder="企业信息" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CreateNode);
