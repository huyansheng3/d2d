import * as React from 'react';
import { connect } from 'react-redux';
// import { Link, Route } from 'react-router-dom';
import { LoginForm, RegisterForm, BgBubble } from 'components';
import './index.css';

const mapDispatchToProps = undefined;

const mapStateToProps = undefined;

class LoginPage extends React.Component {
  state = {
    mode: 'login',
  };
  switchMode = mode => {
    this.setState({ mode });
  };

  renderForm(mode) {
    switch (mode) {
      case 'login':
        return (
          <LoginForm
            register={() => this.switchMode('register')}
            forgetPwd={() => this.switchMode('forgetPwd')}
          />
        );
      case 'register':
        return <RegisterForm switchMode={() => this.switchMode('login')} />;
      default:
        return;
    }
  }

  render() {
    let { mode } = this.state;
    return (
      <BgBubble>
        <div className="login-page">{this.renderForm(mode)}</div>
      </BgBubble>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
