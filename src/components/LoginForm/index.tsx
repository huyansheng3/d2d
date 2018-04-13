import * as React from 'react';
import { connect } from 'react-redux';

import { Button, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { login, sendVerifyCode, SMS_TYPE } from 'actions/user';
import { VerifyCode } from 'components';
import { parseInput } from 'utils/Form';
import './style.css'

interface Props extends FormComponentProps {
    onSubmit: (value: any) => any;
    register: () => void;
    forgetPwd: () => void;
    sendVerify: (value: any) => any;
    configs: ReadonlyArray<any>;
}

const mapDispatchToProps = dispatch => ({
    onSubmit: value => dispatch(login(value)),
    sendVerify: value => dispatch(sendVerifyCode(value))
})

const mapStateToProps = ({ user }) => ({

});

class LoginForm extends React.Component<Props, any> {
    sendVerifyCode = e => {
        e.preventDefault();
        let { form: { validateFields }, sendVerify } = this.props;

        validateFields(['mobile'], (err, value) => err ? null : sendVerify({
            ...value,
            smsType: SMS_TYPE.LOGIN
        }))
    }

    onSubmit = e => {
        e.preventDefault();
        let { form: { validateFields }, onSubmit } = this.props;
        validateFields((err, value) => err ? null : onSubmit(value))
    }

    register = e => {
        e.preventDefault();
        let { register } = this.props;
        register();
    }

    forgetPwd = e => {
        e.preventDefault();
        let { forgetPwd } = this.props;
        forgetPwd();
    }

    checkMobile = (rule, value, callback) => {
        const { form } = this.props;
        if (!form.getFieldValue('mobile')) {
            callback('please input your mobile');
        } else {
            callback();
        }
    }

    parseConfig = config => {
        let {
            id,
            rules,
            domId = ''
        } = config;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        switch (domId) {
            case 'VerifyCode':
                return (
                    <Form.Item key={id}>
                        {getFieldDecorator(id, {
                             rules
                        })(
                             <VerifyCode onSend={this.sendVerifyCode}/>
                         )}
                    </Form.Item>
                );
            default: return parseInput(config, form);
        }
    }

    render() {
        const configs = [{
            'id': 'phone',
            'rules': [{ required: true, message: 'Please input your mobile number!' }],
            'inputType': 'text',
            'placeholder': '用户名',
            'icon': 'mobile',
        }, {
            'id': 'password',
            'rules': [{ required: true, message: 'Please input your password!' }],
            'inputType': 'password',
            'placeholder': '密码',
            'icon': 'lock',
        }]

        return (
            <div className="form-content LoginForm">
                <div className="form-content-left">
                    balabala
                </div>
                <div className="form-content-right">
                    <Form>
                        {configs.map( config => this.parseConfig(config))}
                    </Form>
                    <Button
                        type="primary" htmlType="submit" className="login"
                        onClick={this.onSubmit}>
                        登录
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm));
