import * as React from 'react';
import { connect } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button, DatePicker, Modal } from 'antd';
import moment, { Moment } from 'moment';
import { isEmpty } from 'lodash';
import qs from 'qs';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const formItemLayout = {};

interface Props extends FormComponentProps {
  loading: boolean;
  queryGoods: (value: any) => any;
  updateModalVisile: (state: any) => any;
  currentOrder: any;
}

class QueryForm extends React.Component<Props, {}> {
  queryGoods = e => {
    this.props.form.validateFields((err, values) => {
      this.props.queryGoods({ params: values });
    });
  };

  handleReset = e => {
    this.props.form.resetFields();
  };

  handleUpdate = e => {
    this.props.updateModalVisile({ modalVisible: true });
  };

  render() {
    const { loading, form, currentOrder } = this.props;
    const { getFieldDecorator } = form;

    const options = [
      { label: '待付款', value: 'PAYING' },
      { label: '待发货', value: 'DELIVERING' },
      { label: '交易已完成', value: 'COMPLETED' },
    ];

    const selectOptions = options.map(opt => {
      return <Option key={opt.value}>{opt.label}</Option>;
    });

    return (
      <div>
        <div className="query-form">
          <Form layout="inline">
            <FormItem {...formItemLayout} label="订单号">
              {getFieldDecorator('orderNo', {})(<Input placeholder="订单号" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="订单状态">
              {getFieldDecorator('goodsState', {})(
                <Select placeholder="请选择" className="query-form-select">
                  {selectOptions}
                </Select>
              )}
            </FormItem>
            <div className="query-form-operate">
              <FormItem>
                <Button
                  type="primary"
                  loading={loading}
                  onClick={this.queryGoods}>
                  查询
                </Button>
              </FormItem>
              <FormItem>
                <Button type="danger" onClick={this.handleReset}>
                  重置
                </Button>
              </FormItem>
            </div>
          </Form>
        </div>

        <div className="mb10 mt10">
          <Button
            type="primary"
            disabled={isEmpty(currentOrder)}
            onClick={this.handleUpdate}>
            编辑
          </Button>
        </div>
      </div>
    );
  }
}

export default Form.create()(QueryForm);
