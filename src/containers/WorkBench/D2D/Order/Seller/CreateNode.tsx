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

export const creditOptions = [

  {
    label: 'creditParty',
    value: 'O=IssuePartyA, L=London, C=GB',
  },
];
export const buyerOptions = [
    {
        label: 'buyerParty',
        value: 'O=NormalPartyB, L=Paris, C=FR',
    },
];


const selectCreditOptions = creditOptions.map(opt => {
  return <Option key={opt.value}>{opt.label}</Option>;
});

const selectBuyerOptions = buyerOptions.map(opt => {
    return <Option key={opt.value}>{opt.label}</Option>;
});

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

  handleQuantityChange = e => {
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;
    const goodsAmt = getFieldValue('goodsAmt') || 0;
    setFieldsValue({ totalAmt: ((e.target.value || 0) * goodsAmt).toFixed(3) });
  };

  handleGoodsAmtChange = e => {
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;
    const quantity = getFieldValue('quantity') || 0;
    setFieldsValue({ totalAmt: ((e.target.value || 0) * quantity).toFixed(3) });
  };

  render() {
    const { visible, form, onOk, onCancel, isLoading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        confirmLoading={isLoading}
        onOk={this.handleOk}
        title="创建订单"
        okText="创建"
        onCancel={() => onCancel({ modalVisible: false })}
        cancelText="取消">
        <Form layout="vertical">
          <FormItem {...formItemLayout} label="买方">
            {getFieldDecorator('buyerParty', {})(
              <Select placeholder="买方">{selectBuyerOptions}</Select>
            )}
          </FormItem>

          {/*<FormItem {...formItemLayout} label="卖方">*/}
            {/*{getFieldDecorator('sellerParty', {})(*/}
              {/*<Select placeholder="卖方">{selectCreditOptions}</Select>*/}
            {/*)}*/}
          {/*</FormItem>*/}
          <FormItem {...formItemLayout} label="信任方">
            {getFieldDecorator('creditParty', {})(
              <Select placeholder="信任方">{selectCreditOptions}</Select>
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
            {getFieldDecorator('totalAmt', {
              rules: [
                {
                  type: 'number',
                  min: 0,
                  max: 10000000,
                  transform: v => +v,
                  message: '需大于0小于1000W',
                },
              ],
            })(<Input disabled placeholder="总金额" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CreateNode);
