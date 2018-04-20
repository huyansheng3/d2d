import React, { Component } from 'react';
import { Layout, Menu, Input, Select } from 'antd';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { yiLogo } from 'images';
const { Content, Sider, Header, Footer } = Layout;
const { SubMenu, Item } = Menu;
import './index.css';

const Search = Input.Search;
const Option = Select.Option;
interface Props {}

const routes = [
  {
    id: '/',
    title: '首页',
  },
  {
    id: '/d2d/dashboard',
    title: 'D2D入口',
  },
];

class HomeLayout extends Component<Props, any> {
  render() {
    return (
      <Layout className="layout home-layout">
        <Header>
          <div className="home-layout-logo">
            <img className="hlayout__img" src={yiLogo} alt="logo" />
            <span className="hlayout__logo ml20">区块浏览器</span>
          </div>

          <div className="hlayout__search">
            <Select style={{ minWidth: 120 }} defaultValue="primaryKey">
              <Option key="primaryKey">数据主键</Option>
              <Option key="blockHeight">区块高度</Option>
            </Select>
            <Search
              placeholder="请输入查询条件"
              onSearch={value => console.log(value)}
              enterButton
              style={{ width: 200 }}
            />
          </div>
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
