import * as React from 'react';
import { connect } from 'react-redux';
import {
    Route,
} from 'react-router-dom';

import {
    Layout,
} from 'antd';

import {
    DIYHeader,
    Home,
    AssetsShop,
    Help,
    Palace,
} from 'containers';
const { Footer, Content } = Layout;

interface Props {
    match: any,
    user: any
}

const mapDispatchToProps = undefined;

const mapStateToProps = ({ user }) => ({ user })

class Seal extends React.Component<Props, {}> {
    render() {
        let { match, user } = this.props;
        return (
            <Layout>
                <DIYHeader match={match} user={user} />
                <Content className="content">
                    <Route exact path={`${match.url}/`} component={Home}/>
                    <Route path={`${match.url}/assets`} component={AssetsShop}/>
                    <Route path={`${match.url}/docs`} component={Help}/>
                    <Route path={`${match.url}/palace`} component={Palace}/>
                </Content>
                <Footer />
            </Layout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Seal);
