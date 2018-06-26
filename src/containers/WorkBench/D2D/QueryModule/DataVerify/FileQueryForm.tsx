import * as React from 'react';
import { FormComponentProps, FormCreateOption } from 'antd/lib/form';
import { Form, Input, Select, Button, Row, Col, message } from 'antd';
import { get } from 'lodash';
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
  onChange?: (fields) => any;
  tableList: any;
  isLoading: boolean;
  hashForm: any;
  fileTypes: any;
}

class QueryForm extends React.Component<Props, {}> {
  query = e => {
    this.props.form.validateFields((err, fieldValues) => {
      if (!err) {
        this.props.queryVerifyData({ params: fieldValues });
      }
    });
  };

  render() {
    const { isLoading, tableList, hashForm, fileTypes } = this.props;
    const { getFieldDecorator } = this.props.form;

    const fileTypesOptions = fileTypes.map(product => {
      return <Option key={product.type}>{product.typeName}</Option>;
    });

    return (
      <div>
        <Form layout="horizontal">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="选择文件类型">
                {getFieldDecorator('fileType', {
                  initialValue: get(hashForm, 'fileType.value'),
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <Select placeholder="请选择" className="query-form-select">
                    {fileTypesOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="查询条件">
                {getFieldDecorator('keyfield', {
                  initialValue: get(hashForm, 'keyfield.value'),
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
