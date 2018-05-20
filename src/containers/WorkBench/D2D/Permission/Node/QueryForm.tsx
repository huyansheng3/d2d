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
  query: (value: any) => any;
  updateModalVisile: (state: any) => any;
  products: any;
  currentNode: any;
}

type fields = {
  pid: string;
  range: Array<Moment>;
};

class QueryForm extends React.Component<Props, {}> {
  state = {
    isCreate: false,
  };

  query = e => {
    this.props.form.validateFields((err, values) => {
      const params = {
        pid: values.pid,
        leftTime: +values.range[0] || '',
        rightTime: +values.range[1] || '',
      };
      this.props.query({ params });
    });
  };

  handleReset = e => {
    this.props.form.resetFields();
  };

  handleCreate = e => {
    this.props.updateModalVisile({ modalVisible: true, isCreate: true });
  };

  handleUpdate = e => {
    this.props.updateModalVisile({ modalVisible: true, isCreate: false });
  };

  handleDelete = e => {
    Modal.confirm({
      title: '确认删除？',
      content:
        '是否确认删除该上传权限，删除后，相应的节点将无法操作权限对应的上传操作。',
    });
  };

  render() {
    const { loading, form, products, currentNode } = this.props;
    const { getFieldDecorator } = form;
    const options = products.map(product => {
      return <Option key={product.prjNo}>{product.prjName}</Option>;
    });

    return (
      <div>
        <div className="query-form">
          <Form layout="inline">
            <FormItem {...formItemLayout} label="产品名称">
              {getFieldDecorator('pid', {})(
                <Select placeholder="请选择" className="query-form-select">
                  {options}
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="登录时间">
              {getFieldDecorator('range', {
                initialValue: [],
              })(
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['开始时间', '结束时间']}
                />
              )}
            </FormItem>

            <div className="query-form-operate">
              <FormItem>
                <Button type="primary" loading={loading} onClick={this.query}>
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
          <Button type="primary" onClick={this.handleCreate}>
            创建
          </Button>
          <Button
            disabled={isEmpty(currentNode)}
            className="ml20"
            type="primary"
            onClick={this.handleUpdate}>
            编辑
          </Button>
          <Button
            disabled={isEmpty(currentNode)}
            className="ml20"
            type="danger"
            onClick={this.handleDelete}>
            删除
          </Button>
        </div>
      </div>
    );
  }
}

export default Form.create()(QueryForm);
