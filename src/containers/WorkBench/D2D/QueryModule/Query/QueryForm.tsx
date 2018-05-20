import * as React from 'react';

import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button } from 'antd';
import { forEach, find } from 'lodash';

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

const projects = [
  {
    label: '接口1',
    value: 1,
  },
  {
    label: '接口2',
    value: 2,
  },
  {
    label: '接口3',
    value: 3,
  },
];

const projectOptions = projects.map(project => (
  <Option key={project.value}>{project.label}</Option>
));

interface Props extends FormComponentProps {
  isLoading?: any;
  queryPermission: (data: any) => any;
  products: any;
  pid: any;
  onChange: (data: any) => any;
}
class QueryForm extends React.Component<Props, {}> {
  handleClick = e => {
    const pid = this.props.form.getFieldValue('pid');
    this.props.queryPermission({ pid });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, queryPermission, products, pid, onChange } = this.props;

    const options = products.map(product => {
      return <Option key={product.prjNo}>{product.prjName}</Option>;
    });

    return (
      <div className="query-form">
        <Form layout="inline">
          <FormItem {...formItemLayout} label="产品名称">
            {getFieldDecorator('pid', {})(
              <Select placeholder="请选择" className="query-form-select">
                {options}
              </Select>
            )}
          </FormItem>

          <FormItem className="query-form-btn">
            <Button
              loading={isLoading}
              type="primary"
              onClick={this.handleClick}>
              查询
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create({
  onFieldsChange(props: { onChange }, changedFields) {
    const data = {};
    forEach(changedFields, (field, key) => {
      data[key] = field.value;
    });
    props.onChange(data);
  },
})(QueryForm);
