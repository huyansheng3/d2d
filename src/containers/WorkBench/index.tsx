import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd';
import { LoginPage } from 'containers';
import { getMenuItems, getMenuContent } from 'config/workbench';
import { LogoutMenuItem } from 'components/WrapMenuItem';
import { tail } from 'lodash';
import { wechat, yiLogo, logo } from 'images';
import CustomFooter from 'components/Footer';
import './style.css';

const { Content, Sider, Header, Footer } = Layout;
const { SubMenu, Item } = Menu;
interface Props {
  user: any;
  match: any;
  history: any;
  location: any;
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = ({ user }) => ({ user });

class WorkBench extends React.Component<Props, {}> {
  state = {
    collapsed: false,
  };
  renderMenu(config) {
    let { id, title, subItems = [], parent, MenuIcon } = config;
    let { match } = this.props;
    if (!subItems.length) {
      let { noLink } = config;
      if (noLink) {
        return (
          <Menu.Item key={id}>
            {MenuIcon}
            <span>{title}</span>
          </Menu.Item>
        );
      }
      const url = parent
        ? `${match.url}/${parent}/${id}`
        : `${match.url}/${id}`;
      return (
        <Menu.Item key={url}>
          {MenuIcon}
          <span>{title}</span>
        </Menu.Item>
      );
    }
    return (
      <SubMenu
        key={id}
        title={
          <span>
            {MenuIcon}
            <span>{title}</span>
          </span>
        }>
        {subItems.map(subConfig => {
          const newSubConfig = Object.assign({}, subConfig, { parent: id });
          return this.renderMenu(newSubConfig);
        })}
      </SubMenu>
    );
  }

  renderContent({ id, dom }) {
    let { match } = this.props;
    return <Route key={id} path={`${match.url}/${id}`} component={dom} />;
  }

  handleMenuClick = ({ key }) => {
    if (key.match('blockBrowserEntry')) {
      this.props.history.push('/');
    } else {
      this.props.history.push(key);
    }
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    let { user, location } = this.props;
    let { role } = user.user;

    if (!role) {
      return (
        <Layout>
          <Content>
            <LoginPage />
          </Content>
        </Layout>
      );
    }
    return (
      <Layout className="layout workbench-layout">
        <Header>
          <div className="wlayout__logo">
            <img className="wllogo__img" src={logo} alt="logo" />
          </div>

          <Menu theme="dark" className="wlayout__menu" mode="horizontal">
            <SubMenu
              title={<span>欢迎您，陈先生</span>}
              className="wlmenu__settings">
              <Item key="logout">
                <Icon type="logout" />
                <LogoutMenuItem />
              </Item>
            </SubMenu>
          </Menu>
        </Header>

        <Content className="layout__content">
          <Layout>
            <Sider
              width={200}
              className="lcontent__sider"
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}>
              <Menu
                mode="inline"
                onClick={this.handleMenuClick}
                selectedKeys={[location.pathname]}>
                {getMenuItems(role).map(item => this.renderMenu(item))}
              </Menu>

              <div className="tech-support">
                <p>EverChain-Explorer 1.0</p>
                <p className="tech">技术支持—链平方</p>
              </div>
            </Sider>
            <Content className="lcontent__content">
              <div className="lccontent__dashboard">
                {getMenuContent(role).map(doc => this.renderContent(doc))}
              </div>
              <CustomFooter />
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkBench);
