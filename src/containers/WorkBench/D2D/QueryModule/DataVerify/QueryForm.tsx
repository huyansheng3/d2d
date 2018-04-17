import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button, Row, Col, message } from 'antd';
import copy from 'copy-to-clipboard';

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
    label: '表1',
    value: 1,
  },
  {
    label: '表2',
    value: 2,
  },
  {
    label: '表3',
    value: 3,
  },
];

const projectOptions = projects.map(project => (
  <Option key={project.value}>{project.label}</Option>
));

interface Props extends FormComponentProps {
  queryVerifyData: (data: any) => any;
  verifyData: any;
  isLoading: boolean;
}

class QueryForm extends React.Component<Props, {}> {
  state = {
    visible: false,
    confirmLoading: false,
    ModalText: 'Content of the modal',
  };
  query = e => {
    this.props.form.validateFields((err, values) => {
      debugger;
      this.props.queryVerifyData({ data: values });
    });
  };

  handleCopy = e => {
    const { verifyData } = this.props;
    const { plaintext } = verifyData[0];
    copy(plaintext);
    message.success('复制成功！');
  };

  render() {
    const { isLoading } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="horizontal">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="选择表">
                {getFieldDecorator('table', {})(
                  <Select placeholder="请选择" className="query-form-select">
                    {projectOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="查询条件">
                {getFieldDecorator('primaryKey', {})(
                  <Input placeholder="请输入主键" />
                )}
              </FormItem>
            </Col>
          </Row>

          <FormItem>
            <Button type="primary" loading={isLoading} onClick={this.query}>
              查询
            </Button>

            <Button type="primary" className="ml20" onClick={this.handleCopy}>
              复制
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(QueryForm);
