import * as React from 'react';
import { Button, Input, Icon } from 'antd';
import './style.css';

export const DOM_CONFIG = {
    'id': 'verifyCode',
    'inputType': 'text',
    'placeholder': 'vcode',
    'icon': 'safety',
}

interface Props {
    onSend: (e: any) => any;
}

export default class VerifyCode extends React.Component<Props, any> {
    render() {
        let {
            id,
            inputType,
            icon,
            placeholder,
        } = DOM_CONFIG;
        let { onSend, ...props } = this.props;
        return (
            <div className="VerifyCode">
                <Input
                    {...props}
                    id={id}
                    type={inputType}
                    prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder={placeholder} />
                <Button type="primary" onClick={onSend}>获取验证码</Button>
            </div>
        )
    }
}
