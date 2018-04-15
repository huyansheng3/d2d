import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
const { Content, Sider, Header, Footer } = Layout;
const { SubMenu, Item } = Menu;

interface Props {}

const routes = [
  {
    id: '/',
    title: '首页',
  },
  {
    id: '/blockQuery',
    title: '区块查询',
  },
  {
    id: '/d2d',
    title: 'D2D入口',
  },
];

class HomeLayout extends Component<Props, any> {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <Menu theme="dark" className="layout__header" mode="horizontal">
            <Item key="home">
              <Link to="/">区块浏览器</Link>
            </Item>
          </Menu>
        </Header>

        <Content>
          <Layout>
            <Sider width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['/']}
                style={{ height: '100%', borderRight: 0 }}>
                {routes.map(({ id, title }) => {
                  return (
                    <Item key={id}>
                      <Link to={id}>{title}</Link>
                    </Item>
                  );
                })}
              </Menu>
            </Sider>
            <Content>{this.props.children}</Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default HomeLayout;
