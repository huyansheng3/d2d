import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd';
import { LoginPage } from 'containers';
import { getMenuItems, getMenuContent } from 'config/workbench';
import { LogoutMenuItem } from 'components/WrapMenuItem';
import { tail } from 'lodash';
import { wechat } from 'images';
import './style.css';

const { Content, Sider, Header, Footer } = Layout;
const { SubMenu, Item } = Menu;
interface Props {
  user: any;
  match: any;
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
        <Menu.Item key={id}>
          {MenuIcon}
          <span>
            <Link to={url}>{title}</Link>
          </span>
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

  handleMenuClick = params => {
    console.log(params);
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    let { user = {}, location } = this.props;

    let { identity } = user;
    if (!identity) {
      return (
        <Layout>
          <Content>
            <LoginPage />
          </Content>
        </Layout>
      );
    }
    return (
      <Layout className="layout">
        <Header>
          <Menu theme="dark" className="layout__header" mode="horizontal">
            <Item key="home">易工程</Item>
            <SubMenu
              title={<span>欢迎您，黄先生</span>}
              className="header__settings">
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
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}>
              <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={['dashboard']}>
                {getMenuItems(identity).map(item => this.renderMenu(item))}
              </Menu>
            </Sider>
            <Content className="lcontent__content">
              {getMenuContent(identity).map(doc => this.renderContent(doc))}
            </Content>
          </Layout>
        </Content>

        <Footer className="layout__footer">
          <Row type="flex" justify="space-between" align="middle">
            <Col span={4} className="lfooter__info lfooter__help">
              <h2>帮助</h2>
              <ul>
                <li>
                  <a href="">易工程链接</a>
                </li>
                <li>
                  <a href="">文档</a>
                </li>
              </ul>
            </Col>
            <Col span={16} className="lfooter__info lfooter__service">
              <h2>客服支持</h2>
              <ul>
                <li>
                  邮箱地址: <a href="mailto:">XXXXXXXXXXXX</a>
                </li>
                <li>
                  电话: <a href="tel:">XXXXXXXXXXXX</a>
                </li>
              </ul>
            </Col>
            <Col span={4} className="lfooter__wechat">
              <img src={wechat} alt="wechat" />
            </Col>
          </Row>
          <div className="lfooter__company">
            <p> ©2018 公司名称 XXXX</p>
          </div>
        </Footer>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkBench);
