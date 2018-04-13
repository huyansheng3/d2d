import * as React from 'react';
import { connect } from 'react-redux';
// import { Link, Route } from 'react-router-dom';
import {
    LoginForm,
    RegisterForm,
} from 'components';

const mapDispatchToProps = undefined

const mapStateToProps = undefined

class LoginPage extends React.Component {
    state = {
        mode: 'login'
    }
    switchMode = mode => {
        this.setState({ mode })
    }

    renderForm(mode) {
        switch (mode) {
            case 'login':
                return (
                    <LoginForm
                        register={() => this.switchMode('register')}
                        forgetPwd={() => this.switchMode('forgetPwd')}
                    />);
            case 'register':
                return <RegisterForm switchMode={() => this.switchMode('login')} />;
            default: return ;
        }
    }

    render() {
        let { mode } = this.state;
        return (
            <div>
                <div className="form-header">
                    XX公司 D2D系统
                </div>
                {this.renderForm(mode)}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
