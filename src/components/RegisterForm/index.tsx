import * as React from 'react';
import { connect } from 'react-redux';

import { Button, Form, Divider, Row, Col, Checkbox, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { UploadForm } from 'components';
import { register, sendVerifyCode, SMS_TYPE } from 'actions/user';
import { parseInput, parseVerifyCode, parseRadio, parseSelect, parseCascader, parseDatePicker } from 'utils/Form';
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
    sendVerify: value => dispatch(sendVerifyCode(value))
})

const mapStateToProps = () => ({
})

class RegisterForm extends React.Component<Props, any> {
    state = {
        agree: false,
        imageUrl: ''
    }
    sendVerifyCode = e => {
        e.preventDefault();
        let { form: { validateFields }, sendVerify } = this.props;
        validateFields(['mobile'], (err, value) => err ? null : sendVerify({
            ...value,
            smsType: SMS_TYPE.SIGNUP
        }))
    }

    onSubmit = e => {
        e.preventDefault();
        let { form: { validateFields }, onSubmit } = this.props;
        console.log(this.state.agree)
        if (!this.state.agree) {
            message.warning('请勾选同意注册协议')
        } else {
            validateFields((err, value) => err ? null : onSubmit(value))
        }
    }

    switchMode = e => {
        e.preventDefault();
        let { switchMode } = this.props;
        switchMode()
    }

    changeAgree = e => {
        this.setState({
            agree: e.target.checked
        })
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }


    parseConfig = config => {
        let {
            id,
            domType = '',
        } = config;
        const { form } = this.props;
        switch (domType) {
            case 'verifyCode':
                config = {...config, onSend: this.sendVerifyCode}
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
            case 'cascader': return parseCascader(config, form);
            case 'radio': return parseRadio(config, form);
            case 'select': return parseSelect(config, form);
            case 'datePicker': return parseDatePicker(config, form);
            default: return parseInput(config, form);
        }
    }

    render() {
        return (
            <div className="RegisterForm">
                <Row>
                    <Form>
                        <div className="form-header">
                            基本信息
                        </div>
                        {basicRegister.map( config => this.parseConfig(config))}
                        <Divider type="horizontal" />
                        <div className="form-header">
                            企业信息
                        </div>
                        {corpRegister.map( config => this.parseConfig(config))}
                    </Form>
                </Row>
                <Divider type="horizontal" />
                <Checkbox onChange={this.changeAgree}>我同意<a href="#">某个注册协议</a></Checkbox>
                <Row>
                    <Col span={8} offset={8}>
                        <Button type="primary" onClick={this.onSubmit}>提交注册</Button>
                    </Col>
                    <Col span={8}>
                        <Button onClick={this.switchMode}>返回登录</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RegisterForm))
