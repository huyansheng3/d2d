import * as React from 'react';
import { connect } from 'react-redux';

import { Button, Form, Divider, Row, Col, Checkbox, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { UploadForm } from 'components';
import { register, sendVerifyCode, SMS_TYPE } from 'actions/user';
import {
  parseInput,
  parseVerifyCode,
  parseRadio,
  parseSelect,
  parseCascader,
  parseDatePicker,
  parseCheckbox,
} from 'utils/Form';
import { basicRegister, corpRegister } from 'config/form';
import './style.css';

interface Props extends FormComponentProps {
  onSubmit: (value: any) => any;
  sendVerify: (value: {}) => any;
  switchMode: () => void;
  configs: ReadonlyArray<any>;
  parseInput: (config: {}, form: {}, formItemLayout?: {}) => any;
}

const mapDispatchToProps = dispatch => ({
  onSubmit: value => dispatch(register(value)),
  sendVerify: value => dispatch(sendVerifyCode(value)),
});

const mapStateToProps = () => ({});

const { Item } = Form;

class RegisterForm extends React.Component<Props, any> {
  state = {
    agree: false,
    imageUrl: '',
    confirmDirty: false,
  };
  sendVerifyCode = e => {
    e.preventDefault();
    let { form: { validateFields }, sendVerify } = this.props;
    validateFields(
      ['mobile'],
      (err, value) =>
        err
          ? null
          : sendVerify({
              ...value,
              smsType: SMS_TYPE.SIGNUP,
            })
    );
  };

  onSubmit = e => {
    e.preventDefault();
    let { form: { validateFields }, onSubmit } = this.props;
    console.log(this.state.agree);
    if (!this.state.agree) {
      message.warning('请勾选同意注册协议');
    } else {
      validateFields((err, value) => (err ? null : onSubmit(value)));
    }
  };

  switchMode = e => {
    e.preventDefault();
    let { switchMode } = this.props;
    switchMode();
  };

  changeAgree = e => {
    this.setState({
      agree: e.target.checked,
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleConfirmBlur = e => {
    debugger;
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['password_confirm'], { force: true }, () => {});
    }
    callback();
  };

  parseConfig = config => {
    let { id, domType = '' } = config;
    const { form } = this.props;
    switch (domType) {
      case 'verifyCode':
        config = { ...config, onSend: this.sendVerifyCode };
        return parseVerifyCode(config, form);
      case 'upload':
        let { files } = config;
        return (
          <UploadForm
            key={id}
            configs={files}
            action="http://47.97.195.97:9999/c2mart-server/uncheck/file/upload"
            form={form}
          />
        );
      case 'cascader':
        return parseCascader(config, form);
      case 'checkbox':
        return parseCheckbox(config, form);
      case 'radio':
        return parseRadio(config, form);
      case 'select':
        return parseSelect(config, form);
      case 'datePicker':
        return parseDatePicker(config, form);
      default:
        return parseInput(config, form);
    }
  };

  render() {
    const configs = [
      {
        id: 'phone',
        rules: [
          { required: true, message: 'Please input your mobile number!' },
        ],
        inputType: 'text',
        placeholder: '用户名',
        icon: 'mobile',
        formItemLayout: {
          wraperCol: 24,
        },
      },
      {
        id: 'email',
        rules: [
          { required: true, message: 'Please input your mobile number!' },
          { type: 'email', message: '邮箱格式不正确!' },
        ],
        inputType: 'text',
        placeholder: '邮箱',
        icon: 'mail',
        formItemLayout: {
          wraperCol: 24,
        },
      },
      {
        id: 'password',
        rules: [
          { required: true, message: 'Please input your password!' },
          {
            validator: this.validateToNextPassword,
          },
        ],
        inputType: 'password',
        placeholder: '密码',
        icon: 'lock',
        formItemLayout: {
          wraperCol: 24,
        },
      },
      {
        id: 'password_confirm',
        rules: [
          { required: true, message: 'Please input your password!' },
          {
            validator: this.compareToFirstPassword,
          },
        ],
        inputType: 'password',
        placeholder: '确认密码',
        icon: 'lock',
        onBlur: this.handleConfirmBlur,
        formItemLayout: {
          wraperCol: 24,
        },
      },
    ];

    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="regitser-form">
        <div className="rform__content">
          <div className="rfcontent__title">
            <h1>欢迎使用 链平方 D2D 数据网关系统</h1>
          </div>
          <Form>
            {configs.map(config => this.parseConfig(config))}

            <Item>
              {getFieldDecorator('agree', {
                rules: [
                  {
                    required: true,
                    message: '请确认用户协议&隐私协议',
                  },
                ],
              })(
                <Checkbox onChange={this.changeAgree}>
                  <a href="#">用户协议</a> & <a href="#">隐私协议</a>
                </Checkbox>
              )}
            </Item>
          </Form>

          <div>
            <Button
              type="primary"
              className="rfcontent__btn rfcontent__register"
              onClick={this.onSubmit}>
              注册
            </Button>

            <Button
              type="primary"
              className="rfcontent__btn rfcontent__back"
              onClick={this.switchMode}>
              返回
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create()(RegisterForm)
);
