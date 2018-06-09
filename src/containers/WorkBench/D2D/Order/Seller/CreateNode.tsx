import * as React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { forEach, isEmpty } from 'lodash';
import { parseInitValue } from 'utils/Utils';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {};

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
  createGoodsOrder: (value: any) => any;
  onCancel: (state?: any) => any;
  onOk: (state?: any) => any;
  visible: boolean;
  isLoading?: boolean;
}

class CreateNode extends React.Component<Props, {}> {
  handleOk = e => {
    const { form, onOk } = this.props;

    form.validateFields((errors, values) => {
      if (!errors) {
        this.props.createGoodsOrder({ data: values }).then(({ payload }) => {
          onOk && onOk({ modalVisible: false });
        });
      }
    });
  };

  handleQuantityChange = value => {
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;
    const goodsAmt = getFieldValue('goodsAmt') || 0;
    setFieldsValue({ totalAmt: (value || 0) * goodsAmt });
  };

  handleGoodsAmtChange = value => {
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;
    const quantity = getFieldValue('quantity') || 0;
    setFieldsValue({ totalAmt: (value || 0) * quantity });
  };

  render() {
    const { visible, form, onOk, onCancel, isLoading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        confirmLoading={isLoading}
        onOk={this.handleOk}
        title="编辑"
        onCancel={() => onCancel({ modalVisible: false })}>
        <Form layout="vertical">
          <FormItem {...formItemLayout} label="买方">
            {getFieldDecorator('buyerParty', {})(<Input placeholder="买方" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="卖方">
            {getFieldDecorator('sellerParty', {})(<Input placeholder="卖方" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="信任方">
            {getFieldDecorator('creditParty', {})(
              <Input placeholder="信任方" />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="商品名称">
            {getFieldDecorator('name', {})(<Input placeholder="商品名称" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="数量">
            {getFieldDecorator('quantity', {})(
              <Input onChange={this.handleQuantityChange} placeholder="数量" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="单位">
            {getFieldDecorator('unit', {})(<Input placeholder="单位" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="单价">
            {getFieldDecorator('goodsAmt', {})(
              <Input onChange={this.handleGoodsAmtChange} placeholder="单价" />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="总金额">
            {getFieldDecorator('totalAmt', {})(<Input placeholder="总金额" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CreateNode);
