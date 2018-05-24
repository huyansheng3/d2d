import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Select, Upload, Input, Button, Icon, notification } from 'antd';
import { queryProduct, ACTION_TYPE } from 'actions/query-module';
import { FormComponentProps } from 'antd/lib/form';
import { wrapServer } from 'utils/Axios';
import { find, head } from 'lodash';
import api from 'config/api';
import './index.css';
import { customRequest } from 'utils/Utils';

const Item = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

const formItemLayout = {
  wrapperCol: { span: 10 },
};

interface Props extends FormComponentProps {
  queryProduct: (data: any) => any;
  queryModule: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryProduct: value => dispatch(queryProduct(value)),
});

const mapStateToProps = ({ queryModule, ui }) => ({ queryModule, ui });

class FileUpload extends React.Component<Props, any> {
  state = {};

  componentDidMount() {
    this.props.queryProduct({});
  }

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, queryModule } = this.props;
    const { products } = queryModule;
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const product = find(products, { prjNo: Number(values.pid) }) || {};
        const doneHashs = values.hashs.filter(item => item.status === 'done');
        const hash = head(doneHashs).response.data;
        const params = {
          pid: values.pid,
          comment: values.comment,
          productName: product.prjName,
          fileType: 'idCard',
          hash: hash,
        };
        wrapServer({
          url: api.attachment,
          params: params,
        }).then(data => {
          notification.success({
            message: 'Success',
            description: '保存成功',
          });
        });
      }
    });
  };

  render() {
    let { queryModule, ui, form } = this.props;
    const { products, permission } = queryModule;
    const { loading, isLoading } = ui;

    const { getFieldDecorator, getFieldValue } = form;

    const options = products.map(product => {
      return <Option key={product.prjNo}>{product.prjName}</Option>;
    });

    const disableUpload =
      (getFieldValue('hashs') || []).filter(item => item.status === 'done')
        .length >= 1;

    return (
      <div>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Item label="产品" {...formItemLayout}>
            {getFieldDecorator('pid', {
              rules: [{ required: true, message: '不能为空' }],
            })(<Select placeholder="请选择">{options}</Select>)}
          </Item>

          <Item label="上传" {...formItemLayout}>
            {getFieldDecorator('hashs', {
              initialValue: [],
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [
                { required: true, message: '不能为空' },
                {
                  validator: (
                    rule,
                    value = [],
                    callback,
                    source,
                    validateOptions
                  ) => {
                    if (
                      value.filter(item => item.status === 'done').length < 1
                    ) {
                      callback('至少有一份上传成功的文件');
                    }
                    callback();
                  },
                },
              ],
            })(
              <Upload.Dragger
                disabled={disableUpload}
                customRequest={customRequest}
                name="file"
                accept=".zip"
                action={api.upload}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            )}
          </Item>

          <Item label="备注" {...formItemLayout}>
            {getFieldDecorator('comment', {})(<TextArea rows={4} />)}
          </Item>

          <Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading[api.attachment]}>
              保存
            </Button>
          </Item>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create()(FileUpload)
);
