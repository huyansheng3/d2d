import * as React from 'react';
import { connect } from 'react-redux';

import { Divider, Row, Col, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { register, sendVerifyCode, SMS_TYPE } from 'actions/user';
import { parseInput, parseRadio, parseSelect, parseCascader, parseDatePicker } from 'utils/Form';
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

class CorpAccount extends React.Component<Props, any> {
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
            domType = '',
        } = config;
        const { form } = this.props;
        switch (domType) {
            case 'cascader': return parseCascader(config, form);
            case 'radio': return parseRadio(config, form);
            case 'select': return parseSelect(config, form);
            case 'datePicker': return parseDatePicker(config, form);
            default: return parseInput(config, form);
        }
    }

    render() {
        return (
            <div className="CorpAccount">
                <Row>
                    <Col>111</Col>
                </Row>
                <Divider type="horizontal" />
                <Row>
                    <Col>222</Col>
                </Row>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CorpAccount)
