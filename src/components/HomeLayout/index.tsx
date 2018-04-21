import React, { Component } from 'react';
import { Layout, Menu, Input, Select } from 'antd';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { yiLogo } from 'images';
import SearchForm from './SearchForm';
import CustomFooter from 'components/Footer';

const { Content, Sider, Header, Footer } = Layout;
const { SubMenu, Item } = Menu;
import './index.css';

const Search = Input.Search;
const Option = Select.Option;
interface Props {
  queryBykeyfield?: (data: any) => any;
}

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
    const { queryBykeyfield } = this.props;
    return (
      <Layout className="layout home-layout">
        <Header>
          <div className="home-layout-logo">
            <img className="hlayout__img" src={yiLogo} alt="logo" />
            <span className="hlayout__logo ml20">区块浏览器</span>
          </div>

          <SearchForm queryBykeyfield={queryBykeyfield!} />
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
            <Content>
              {this.props.children}
              <CustomFooter className="home-layout-footer" />
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default HomeLayout;
