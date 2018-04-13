import * as React from 'react';
import { connect } from 'react-redux';
import { logout } from 'actions/user';

interface Props {
    logout: () => any;
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

const mapStateToProps = ({ user }) => ({ user })

class LogoutMenuItem extends React.Component<Props, any> {
    onClick = e => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return (
            <span onClick={this.onClick}>账户登出</span>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutMenuItem);
