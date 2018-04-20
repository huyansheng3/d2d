import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd';
import { LoginPage } from 'containers';
import { getMenuItems, getMenuContent } from 'config/workbench';
import { LogoutMenuItem } from 'components/WrapMenuItem';
import { tail } from 'lodash';
import { wechat, yiLogo } from 'images';
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
            <img className="wllogo__img" src={yiLogo} alt="logo" />
            <span className="wllogo__name">易工程</span>
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
            </Sider>
            <Content className="lcontent__content">
              <div className="lccontent__dashboard">
                {getMenuContent(role).map(doc => this.renderContent(doc))}
              </div>
              <Footer className="layout__footer">
                <Row type="flex" justify="space-between" align="top">
                  <Col span={4} className="lfooter__info lfooter__help">
                    <h2>帮助</h2>
                    <ul>
                      <li>
                        <a target="_blank" href="http://www.yigongcheng.com/">
                          易工程链接
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href="http://www.yigongcheng.com/Home/Helper/index">
                          文档
                        </a>
                      </li>
                    </ul>
                  </Col>
                  <Col span={16} className="lfooter__info lfooter__service">
                    <h2>客服支持</h2>
                    <ul>
                      <li>客服：400-100-4445</li>
                      <li>
                        邮箱地址: <a href="mailto:">service@e2winner.com</a>
                      </li>
                      <li>
                        地址: 福建省厦门市思明区软件园二期望海路37号二层203
                      </li>
                    </ul>
                  </Col>
                  <Col span={4} className="lfooter__wechat">
                    {/* <img src={wechat} alt="wechat" /> */}
                  </Col>
                </Row>
                <div className="lfooter__company">
                  <p> ©2018 厦门易功成信息技术有限公司 </p>
                </div>
              </Footer>
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkBench);
