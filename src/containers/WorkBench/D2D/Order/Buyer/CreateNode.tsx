import * as React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { forEach, isEmpty } from 'lodash';
import { parseInitValue } from 'utils/Utils';
import { options } from './QueryForm';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {};

export const creditOptions = [
  {
    label: 'creditParty',
    value: 'O=IssuePartyA, L=London, C=GB',
  },
];


export const sellerOptions = [
    {
        label: 'sellerParty',
        value: 'O=NormalPartyA, L=New York, C=US',
    },
];

const selectCreditOptions = creditOptions.map(opt => {
  return <Option key={opt.value}>{opt.label}</Option>;
});

const selectSellerOptions = sellerOptions.map(opt => {
    return <Option key={opt.value}>{opt.label}</Option>;
});

const selectStateOption = options.map(opt => {
  return <Option key={opt.value}>{opt.label}</Option>;
});

interface Props extends FormComponentProps {
  confirmGoodsOrder: (value: any) => any;
  queryGoods: () => any;
  onCancel: (state?: any) => any;
  onOk: (state?: any) => any;
  visible: boolean;
  isLoading?: boolean;
  currentOrder: any;
}

class CreateNode extends React.Component<Props, {}> {
  handleOk = e => {
    const { form, onOk } = this.props;

    form.validateFields((errors, values) => {
      if (!errors) {
        const { currentOrder } = this.props;
        this.props
          .confirmGoodsOrder({
            data: {
              ...currentOrder,
              ...values,
              deliveryDate: values.deliveryDate.format('YYYY-MM-DD'),
            },
          })
          .then(({ payload }) => {
            onOk && onOk({ modalVisible: false });
            this.props.queryGoods();
          });
      }
    });
  };

  render() {
    const {
      visible,
      form,
      currentOrder,
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
        okText="确认付款"
        title="付款"
        cancelText="取消"
        onCancel={() => onCancel({ modalVisible: false })}>
        <Form layout="vertical">
          {/*<FormItem {...formItemLayout} label="买方">*/}
            {/*{getFieldDecorator('buyerParty', {*/}
              {/*initialValue: currentOrder.buyerParty,*/}
            {/*})(*/}
              {/*<Select disabled placeholder="买方">*/}
                {/*{selectCreditOptions}*/}
              {/*</Select>*/}
            {/*)}*/}
          {/*</FormItem>*/}

          <FormItem {...formItemLayout} label="卖方">
            {getFieldDecorator('sellerParty', {
              initialValue: currentOrder.sellerParty,
            })(
              <Select disabled placeholder="卖方">
                {selectSellerOptions}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="信任方">
            {getFieldDecorator('creditParty', {
              initialValue: currentOrder.creditParty,
            })(
              <Select disabled placeholder="信任方">
                {selectCreditOptions}
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="商品名称">
            {getFieldDecorator('name', {
              initialValue: currentOrder.name,
            })(<Input disabled placeholder="商品名称" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="数量">
            {getFieldDecorator('quantity', {
              initialValue: currentOrder.quantity,
            })(<Input disabled placeholder="数量" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="单位">
            {getFieldDecorator('unit', {
              initialValue: currentOrder.unit,
            })(<Input disabled placeholder="单位" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="单价">
            {getFieldDecorator('goodsAmt', {
              initialValue: currentOrder.goodsAmt,
            })(<Input disabled placeholder="单价" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="订单状态">
            {getFieldDecorator('goodsState', {
              initialValue: currentOrder.goodsState,
            })(
              <Select disabled placeholder="订单状态">
                {selectStateOption}
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="总金额">
            {getFieldDecorator('totalAmt', {
              initialValue: currentOrder.totalAmt,
            })(<Input disabled placeholder="总金额" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="收货地址">
            {getFieldDecorator('buyerAddress', {
              initialValue: currentOrder.buyerAddress,
            })(<Input placeholder="收货地址" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="收货日期">
            {getFieldDecorator('deliveryDate', {
              initialValue: currentOrder.deliveryDate
                ? moment(currentOrder.deliveryDate)
                : undefined,
            })(<DatePicker placeholder="收货日期" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CreateNode);
