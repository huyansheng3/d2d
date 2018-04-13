import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import {
    Layout,
    Menu,
} from 'antd';
import { LoginPage } from 'containers';
import { getMenuItems, getMenuContent } from 'config/workbench';
import './style.css';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

interface Props {
    user: any;
    match: any;
}

const mapDispatchToProps = dispatch => ({

})

const mapStateToProps = ({ user }) => ({ user })

class WorkBench extends React.Component<Props, {}> {
    renderMenu(config) {
        let { id, title, subItems = [] } = config
        let { match } = this.props;
        if (!subItems.length) {
            let { noLink } = config;
            if (noLink) {
                return (
                    <Menu.Item key={id}>
                        {title}
                    </Menu.Item>
                )
            }
            return (
                <Menu.Item key={id}>
                    <Link to={`${match.url}/${id}`}>{title}</Link>
                </Menu.Item>
            )
        }
        return (
            <SubMenu key={id} title={title}>
                {subItems.map( subConfig => this.renderMenu(subConfig))}
            </SubMenu>
        )
    }

    renderContent({id, dom}) {
        let { match } = this.props;
        return <Route key={id} path={`${match.url}/${id}`} component={dom}/>
    }
    render() {
        let { user = {} } = this.props;
        let { identity } = user;
        if (!identity) {
            return (
                <Layout>
                    <Content>
                        <LoginPage/>
                    </Content>
                </Layout>
            )
        }
        return (
            <Layout>
                <Content>
                    <div className="WorkBench">
                        <Sider width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['packAsset']}
                                defaultOpenKeys={['corpManage', 'accountManage']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                {getMenuItems(identity).map( item => this.renderMenu(item))}
                            </Menu>
                        </Sider>
                        {getMenuContent(identity).map( doc => this.renderContent(doc))}
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkBench);
