import * as React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { query, create } from 'actions/assets';
import moment, { Moment } from 'moment';
import qs from 'qs';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const formItemLayout = {};

interface Props extends FormComponentProps {
  loading: boolean;
  query: (value: any) => any;
  exportUrl?: string;
}

type fields = {
  name: string;
  range: Array<Moment>;
};

class QueryForm extends React.Component<Props, {}> {
  query = e => {
    this.props.form.validateFields((err, values) => {
      const params = {
        name: values.name,
        leftTime: +values.range[0] || '',
        rightTime: +values.range[1] || '',
      };
      this.props.query({ params });
    });
  };

  handleReset = e => {
    this.props.form.resetFields();
  };

  get realExportUrl() {
    const { exportUrl, form } = this.props;
    const values = form.getFieldsValue();
    const params = {
      name: (values as fields).name || '',
      leftTime: +(values as fields).range[0] || '',
      rightTime: +(values as fields).range[1] || '',
    };

    return exportUrl + '?' + qs.stringify(params);
  }

  render() {
    const { loading, form, exportUrl } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <div className="query-form">
          <Form layout="inline">
            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator('name', {
                initialValue: '',
              })(<Input placeholder="用户名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="操作时间">
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

        {Boolean(exportUrl) ? (
          <Button
            className="mt10 mb10"
            type="primary"
            href={this.realExportUrl}>
            导出
          </Button>
        ) : null}
      </div>
    );
  }
}

export default Form.create()(QueryForm);
