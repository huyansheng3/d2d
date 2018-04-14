import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { LoginPage } from 'containers';
import { getMenuItems, getMenuContent } from 'config/workbench';
import { LogoutMenuItem } from 'components/WrapMenuItem';
import './style.css';

const { Content, Sider, Header, Footer } = Layout;
const { SubMenu, Item } = Menu;

interface Props {
  user: any;
  match: any;
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = ({ user }) => ({ user });

class WorkBench extends React.Component<Props, {}> {
  renderMenu(config) {
    let { id, title, subItems = [], parent } = config;
    let { match } = this.props;
    if (!subItems.length) {
      let { noLink } = config;
      if (noLink) {
        return <Menu.Item key={id}>{title}</Menu.Item>;
      }
      const url = parent
        ? `${match.url}/${parent}/${id}`
        : `${match.url}/${id}`;
      return (
        <Menu.Item key={id}>
          <Link to={url}>{title}</Link>
        </Menu.Item>
      );
    }
    return (
      <SubMenu key={id} title={title}>
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

  render() {
    let { user = {} } = this.props;
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
          <Menu theme="dark" className="header" mode="horizontal">
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

        <Content>
          <Layout>
            <Sider width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                style={{ height: '100%', borderRight: 0 }}>
                {getMenuItems(identity).map(item => this.renderMenu(item))}
              </Menu>
            </Sider>
            <Content>
              {getMenuContent(identity).map(doc => this.renderContent(doc))}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkBench);
