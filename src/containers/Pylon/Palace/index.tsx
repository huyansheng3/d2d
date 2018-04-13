import * as React from 'react';
import { connect } from 'react-redux';
// import {
//    Route,
//    NavLink as Link
// } from 'react-router-dom';

import { WorkBench } from 'containers';
interface Props {
    match: any;
    user: any
}

const mapDispatchToProps = dispatch => ({

})

const mapStateToProps = ({ user }) => ({ user })

class Palace extends React.Component<Props, any> {
    render() {
        let { user, match } = this.props;
        console.log('render palace')
        // TODO: this componnet should be filled with react-router
        return <WorkBench match={match} user={user} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Palace);
