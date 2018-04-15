import * as React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Select, Button } from 'antd';
import { query, create } from 'actions/assets';
import CreateAssets from './CreateAssets';
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
  onCreateAssets: (value: any) => any;
  query: (value: any) => any;
}

const mapDispatchToProps = dispatch => ({
  onCreateAssets: value => dispatch(create(value)),
  query: value => dispatch(query(value)),
});

const mapStateToProps = ({ user }) => ({});

class QueryForm extends React.Component<Props, {}> {
  state = {
    visible: false,
    confirmLoading: false,
    ModalText: 'Content of the modal',
  };
  query = e => {
    this.props.form.validateFields((err, values) => {
      this.props.query({});
    });
  };
  createAsset = e => {
    this.setState({
      visible: true,
    });
  };
  handleOk = value => {
    this.props.onCreateAssets(value);
    this.setState({
      visible: false,
    });
    // TODO submit loading callback
    // this.props.form.validateFields((err, values) => {
    //     console.log(values)
    // });
    // this.setState({
    //     ModalText: 'The modal will be closed after two seconds',
    //     confirmLoading: true,
    // });
    // this.setState({
    //     visible: false,
    //     confirmLoading: false,
    // });
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, confirmLoading } = this.state;
    return (
      <div className="query-form">
        <Form layout="inline">
          <FormItem {...formItemLayout} label="">
            {getFieldDecorator('mobile', {})(
              <Input id="mobile" placeholder="账号/手机号" />
            )}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('name', {})(
              <Input id="name" placeholder="用户姓名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('status', {
              initialValue: 'all',
            })(
              <Select style={{ width: 120 }}>
                <Option value="jack">所有</Option>
                <Option value="lucy">启用</Option>
                <Option value="Yiminghe">禁用</Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.query}>
              查询
            </Button>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.createAsset}>
              重置
            </Button>
          </FormItem>
        </Form>
        <Modal
          title="创建资产包"
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
          mask
          maskClosable={false}>
          <CreateAssets onSubmit={this.handleOk} />
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create()(QueryForm)
);
