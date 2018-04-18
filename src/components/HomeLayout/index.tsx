import React, { Component } from 'react';
import { Layout, Menu, Input, Select } from 'antd';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
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
    id: '/d2d',
    title: 'D2D入口',
  },
];

class HomeLayout extends Component<Props, any> {
  render() {
    return (
      <Layout className="layout home-layout">
        <Header>
          <span className="hlayout__logo">区块浏览器</span>

          <div className="hlayout__search">
            <Select style={{ minWidth: 120 }} defaultValue="blockHeight">
              <Option key="blockHeight">区块高度</Option>
              <Option key="primaryKey">主键</Option>
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
