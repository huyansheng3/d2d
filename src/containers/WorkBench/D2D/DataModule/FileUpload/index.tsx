import * as React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Select,
  Upload,
  Input,
  Button,
  Icon,
  notification,
  Modal,
} from 'antd';
import {
  queryProduct,
  queryFileTypes,
  queryPermission,
  ACTION_TYPE,
} from 'actions/query-module';
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
  queryFileTypes: (opts: any) => any;
  queryPermission: (opts: any) => any;
  queryModule: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryProduct: value => dispatch(queryProduct(value)),
  queryFileTypes: opts => dispatch(queryFileTypes(opts)),
  queryPermission: opts => dispatch(queryPermission(opts)),
});

const mapStateToProps = ({ queryModule, ui }) => ({ queryModule, ui });

class FileUpload extends React.Component<Props, any> {
  state = {};

  componentDidMount() {
    this.props.queryProduct({});
    this.props.queryFileTypes({});
  }

  normFile = e => {
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
        const doneFiles = values.files
          .filter(item => item.status === 'done')
          .map(item => {
            return {
              hash: item.response.data,
              fileName: item.name,
              size: item.size,
            };
          });

        const submitData = {
          pid: values.pid,
          comment: values.comment,
          productName: product.prjName,
          fileType: values.fileType,
          files: doneFiles,
        };

        wrapServer({
          url: api.attachment,
          data: submitData,
        }).then(data => {
          form.resetFields();
          notification.success({
            message: 'Success',
            description: '保存成功',
          });
        });
      }
    });
  };

  handlePidChange = value => {
    this.props.queryPermission({ pid: value });
    this.props.form.resetFields(['fileType']);
  };

  handleFileTypeChange = value => {
    const { form } = this.props;
    const fileType = form.getFieldValue('fileType');
    // 初次选择时 不弹出提示
    if (!fileType && value) {
      return;
    }

    Modal.confirm({
      title: '确定清空已上传的文件?',
      content: '点击确定将清空已上传的文件，点击取消则不清空',
      onOk: () => {
        form.resetFields(['files']);
      },
    });
  };

  render() {
    let { queryModule, ui, form } = this.props;
    const { products, fileTypes, permission } = queryModule;
    const { loading, isLoading } = ui;

    const { getFieldDecorator, getFieldValue } = form;

    const options = products.map(product => {
      return <Option key={product.prjNo}>{product.prjName}</Option>;
    });

    const tableNames = permission
      .filter(item => item.type === 'file')
      .reduce((prev, curr) => {
        return [...prev, curr.tableName];
      }, []);

    const fileTypesOptions = fileTypes
      .filter(product => tableNames.indexOf(product.type) !== -1)
      .map(product => {
        return <Option key={product.type}>{product.typeName}</Option>;
      });

    return (
      <div>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Item label="产品" {...formItemLayout}>
            {getFieldDecorator('pid', {
              rules: [{ required: true, message: '不能为空' }],
            })(
              <Select onChange={this.handlePidChange} placeholder="请选择">
                {options}
              </Select>
            )}
          </Item>

          <Item label="文件" {...formItemLayout}>
            {getFieldDecorator('fileType', {
              rules: [{ required: true, message: '不能为空' }],
            })(
              <Select onChange={this.handleFileTypeChange} placeholder="请选择">
                {fileTypesOptions}
              </Select>
            )}
          </Item>

          <Item label="上传" {...formItemLayout}>
            {getFieldDecorator('files', {
              initialValue: [],
              valuePropName: 'fileList',
              validateTrigger: 'onBlur',
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
                customRequest={customRequest}
                multiple
                name="file"
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(FileUpload));
