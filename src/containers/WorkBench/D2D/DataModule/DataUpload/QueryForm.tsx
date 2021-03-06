import * as React from 'react';
import { FormComponentProps, FormCreateOption } from 'antd/lib/form';
import { Form, Input, Select, Button, Row, Col, message } from 'antd';
import copy from 'copy-to-clipboard';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  // labelCol: {
  //   span: 4,
  // },
  // wrapperCol: {
  //   span: 20,
  // },
};

interface Props extends FormComponentProps {
  queryVerifyData: (data: any) => any;
  queryHash: (data: any) => any;
  onChange?: (fields) => any;
  verifyData: any;
  tableList: any;
  isLoading: boolean;
}

class QueryForm extends React.Component<Props, {}> {
  query = e => {
    this.props.form.validateFields((err, fieldValues) => {
      if (!err) {
        this.props.queryVerifyData({ params: fieldValues });
        const data = {
          keyfield: fieldValues.id + fieldValues.stateName,
        };
        this.props.queryHash({ data: data });
      }
    });
  };

  render() {
    const { isLoading, tableList } = this.props;
    const { getFieldDecorator } = this.props.form;

    const projectOptions = tableList.map(project => (
      <Option key={project.value}>{project.label}</Option>
    ));

    return (
      <div>
        <Form layout="horizontal">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="选择表">
                {getFieldDecorator('stateName', {
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <Select placeholder="请选择" className="query-form-select">
                    {projectOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="查询条件">
                {getFieldDecorator('id', {
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(<Input placeholder="请输入主键" />)}
              </FormItem>
            </Col>
          </Row>

          <FormItem>
            <Button type="primary" loading={isLoading} onClick={this.query}>
              查询
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create({
  onFieldsChange: (props: { onChange }, changedFields) => {
    props.onChange(changedFields);
  },
})(QueryForm);
