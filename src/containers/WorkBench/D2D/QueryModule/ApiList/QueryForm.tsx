import * as React from 'react';

import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button } from 'antd';

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
    label: '项目1',
    value: 1,
  },
  {
    label: '项目2',
    value: 2,
  },
  {
    label: '项目3',
    value: 3,
  },
];

const projectOptions = projects.map(project => (
  <Option key={project.value}>{project.label}</Option>
));

interface Props extends FormComponentProps {
  isLoading: any;
  queryApiList: (data: any) => any;
}
class QueryForm extends React.Component<Props, {}> {
  handleClick = e => {
    const projectName = this.props.form.getFieldValue('projectName');
    this.props.queryApiList({ id: projectName });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, queryApiList } = this.props;
    return (
      <div className="query-form">
        <Form layout="inline">
          <FormItem {...formItemLayout} label="项目名称">
            {getFieldDecorator('projectName', {})(
              <Select placeholder="请选择" className="query-form-select">
                {projectOptions}
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

export default Form.create()(QueryForm);
