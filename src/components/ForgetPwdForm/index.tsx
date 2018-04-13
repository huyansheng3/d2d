import * as React from 'react';
import { connect } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import { Button, Form, Input, Icon } from 'antd';
import { VerifyCode } from 'components';
import { parseInput } from 'utils/Form';
import './style.css';

interface Props extends FormComponentProps {
    switchMode: () => void;
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = ({ user }) => ({

})

class ForgetPwdForm extends React.Component<Props, any> {
    state = {
        step: 0
    }

    handleSubmit = step => {
        switch (step) {
            case 0: return this.setState({ step: 1 });
            case 1: return this.setState({ step: 2 });
            default:
                let { switchMode } = this.props;
                return switchMode();
        }
    }

    onSubmit = e => {
        e.preventDefault();
        let { form: { validateFields }} = this.props;
        let { step } = this.state;
        validateFields((err, value) => err ? null : this.handleSubmit(step))
    }

    parseInput = ({
        id,
        rules,
        label = '',
        inputType = 'text',
        icon = '',
        placeholder = ''
    }) => {
        let { getFieldDecorator } = this.props.form;
        return (
            <Form.Item key={id} label={label}>
                {getFieldDecorator(id, {
                     rules
                })(
                     <Input
                         id={id}
                         type={inputType}
                         prefix={icon ? <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }}/> : null}
                         placeholder={placeholder} />
                 )}
            </Form.Item>
        )
    }

    parseConfig = config => {
        let {
            id,
            rules,
            domId = '',
            ...props
        } = config;
        const { getFieldDecorator } = this.props.form;
        switch (domId) {
            case 'VerifyCode':
                return (
                    <Form.Item key={id}>
                        {getFieldDecorator(id, {
                             rules
                        })(
                             <VerifyCode {...props}/>
                         )}
                    </Form.Item>
                );
            default: return parseInput(config, this.props.form);
        }
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    clearConfirm = (rule, value, callback) => {
        const form = this.props.form;
        form.setFieldsValue({
            'checkPassword': ''
        })
        callback();
    }

    renderStep = step => {
        switch (step) {
            case 0:
                const STEP_0 = [{
                    'id': 'mobile',
                    'rules': [{ required: true, message: 'Please input your mobile number!' }],
                    'inputType': 'text',
                    'placeholder': 'mobile',
                    'icon': 'mobile',
                }, {
                    'id': 'vcode',
                    'rules': [{ required: true, message: 'Please input your vcode!' }],
                    'domId': 'VerifyCode',
                    'onSend': () => {
                        console.log('on send')
                    }
                }]
                return (
                    <div>
                        {STEP_0.map( config => this.parseConfig(config))}
                    </div>
                )
            case 1:
                const STEP_1 = [{
                    'id': 'password',
                    'rules': [{
                        required: true, message: 'Please input your password!'
                    }, {
                        validator: this.clearConfirm
                    }],
                    'inputType': 'password',
                    'placeholder': 'password',
                    'icon': 'lock',
                }, {
                    'id': 'checkPassword',
                    'rules': [{
                        required: true, message: 'Please input your password!'
                    }, {
                        validator: this.checkPassword
                    }],
                    'inputType': 'password',
                    'placeholder': 'check your password',
                    'icon': 'lock',
                }]
                return (
                    <div>
                        {STEP_1.map( config => this.parseConfig(config))}
                    </div>
                );
            case 2: return (
                <div>恭喜！密码修改成功</div>
            );
            default: return (
                <div />
            )
        }
    }

    render() {
        let { step } = this.state;
        return (
            <div className="ForgetPwdForm">
                {this.renderStep(step)}
                <Button className="next-step" type="primary" onClick={this.onSubmit}>
                {step < 2 ? '下一步' : '返回登录'}
                </Button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ForgetPwdForm))
