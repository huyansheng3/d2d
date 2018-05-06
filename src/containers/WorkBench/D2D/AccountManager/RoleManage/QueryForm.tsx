import * as React from 'react';
import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button } from 'antd';
import { query, create } from 'actions/assets';
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
  loading: boolean;
  findRoles: (params: any) => any;
}

class QueryForm extends React.Component<Props, {}> {
  query = e => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.findRoles(values);
      }
    });
  };

  handleResetClick = e => {
    this.props.form.resetFields();
  };

  render() {
    const { loading, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className="query-form">
        <Form layout="inline">
          <FormItem {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '不能为空' }],
            })(<Input placeholder="角色名称" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '不能为空' }],
            })(
              <Select placeholder="请选择" style={{ width: 120 }}>
                <Option value="2">所有</Option>
                <Option value="1">启用</Option>
                <Option value="0">停用</Option>
              </Select>
            )}
          </FormItem>

          <div className="query-form-operate">
            <FormItem>
              <Button type="primary" onClick={this.query} loading={loading}>
                查询
              </Button>
            </FormItem>
            <FormItem>
              <Button type="danger" onClick={this.handleResetClick}>
                重置
              </Button>
            </FormItem>
          </div>
        </Form>
      </div>
    );
  }
}
export default Form.create()(QueryForm);
