import * as React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  Row,
  Col,
  notification,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import {
  queryUserInfo,
  updateUserInfo,
  ACTION_TYPE,
} from 'actions/account-manager';
import './index.css';

const Item = Form.Item;
interface Props extends FormComponentProps {
  queryUserInfo: (data: any) => any;
  updateUserInfo: (data: any) => any;
  accountManager: any;
  ui: any;
}

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: {
    span: 8,
  },
};

const mapDispatchToProps = dispatch => ({
  queryUserInfo: value => dispatch(queryUserInfo(value)),
  updateUserInfo: value => dispatch(updateUserInfo(value)),
});

const mapStateToProps = ({ accountManager, ui }) => ({ accountManager, ui });

class BasicInfo extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.queryUserInfo({});
  }

  handleSave = e => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        // 执行提交
        this.props.updateUserInfo({ data: values }).then(() => {
          notification.success({
            message: 'Success',
            description: '更新成功',
          });
        });
      }
    });
  };

  render() {
    let { accountManager, ui, form } = this.props;
    const { userInfo } = accountManager;
    const { loading } = ui;

    const { getFieldDecorator } = form;
    return (
      <div className="reset-password">
        <Form layout="horizontal">
          <Item {...formItemLayout} label="企业信息">
            {getFieldDecorator('corporateName', {
              initialValue: userInfo.corporateName,
            })(<Input disabled />)}
          </Item>

          <Item {...formItemLayout} label="账号信息">
            {getFieldDecorator('userName', {
              initialValue: userInfo.userName,
            })(<Input disabled />)}
          </Item>

          <Item {...formItemLayout} label="区块链地址">
            {getFieldDecorator('address', {
              initialValue: userInfo.address,
            })(<Input disabled />)}
          </Item>

          <Item {...formItemLayout} label="联系人姓名">
            {getFieldDecorator('contactName', {
              initialValue: userInfo.contactName,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input />)}
          </Item>

          <Item {...formItemLayout} label="手机">
            {getFieldDecorator('mobile', {
              initialValue: userInfo.mobile,
              rules: [{ required: true, message: '不能为空' }],
            })(<Input />)}
          </Item>

          <Item {...formItemLayout} label="邮箱">
            {getFieldDecorator('email', {
              initialValue: userInfo.email,
              rules: [
                { type: 'email', message: '邮箱格式不正确' },
                { required: true, message: '不能为空' },
              ],
            })(<Input />)}
          </Item>

          <Item wrapperCol={{ span: 8, offset: 2 }}>
            <Button
              type="primary"
              onClick={this.handleSave}
              loading={loading[ACTION_TYPE.UPDATE_USER_INFO]}>
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
)(Form.create()(BasicInfo));
