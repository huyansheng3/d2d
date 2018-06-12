import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd';
import { LoginPage } from 'containers';
import { getMenuItems, getMenuContent } from 'config/workbench';
import { LogoutMenuItem } from 'components/WrapMenuItem';
import { tail, last, find, findIndex } from 'lodash';
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
    let { roleName, userName } = user.user;

    if (!roleName) {
      return (
        <Layout>
          <Content>
            <LoginPage />
          </Content>
        </Layout>
      );
    }

    const currentId = last(location.pathname.split('/'));

    const menuItems = getMenuItems(roleName);
    const currentItem = find(menuItems, item => {
      if (!item.subItems) {
        return false;
      }
      const index = findIndex(item.subItems, { id: currentId });
      return index !== -1;
    });

    if (!currentItem) {
      if (
        menuItems &&
        menuItems[0] &&
        menuItems[0]!.subItems &&
        menuItems[0]!.subItems[0]
      ) {
        return (
          <Redirect
            to={{
              pathname: `/d2d/${menuItems[0]!.id}/${
                menuItems[0]!.subItems[0].id
              }`,
            }}
          />
        );
      }
    }

    // Redirect
    return (
      <Layout className="layout workbench-layout">
        <Header>
          <div className="wlayout__logo">
            <img className="wllogo__img" src={logo} alt="logo" />
          </div>

          <Menu theme="dark" className="wlayout__menu" mode="horizontal">
            <SubMenu
              title={<span>欢迎您，{userName}</span>}
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
                defaultOpenKeys={currentItem ? [currentItem.id] : []}
                selectedKeys={[location.pathname]}>
                {getMenuItems(roleName).map(item => this.renderMenu(item))}
              </Menu>

              {/*<div className="tech-support">*/}
              {/*<p>EverChain-D2D 1.0</p>*/}
              {/*<p className="tech">技术支持—链平方</p>*/}
              {/*</div>*/}
            </Sider>
            <Content className="lcontent__content">
              <div className="lccontent__dashboard">
                {getMenuContent(roleName).map(doc => this.renderContent(doc))}
              </div>
              <CustomFooter />
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkBench);
