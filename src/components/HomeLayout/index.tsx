import React, { Component } from 'react';
import { Layout, Menu, Input, Select } from 'antd';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { yiLogo, logo } from 'images';
import SearchForm from './SearchForm';
import CustomFooter from 'components/Footer';

const { Content, Sider, Header, Footer } = Layout;
const { SubMenu, Item } = Menu;
import './index.css';

const Search = Input.Search;
const Option = Select.Option;
interface Props {
  search?: (data: any) => any;
}

const routes = [
  {
    id: '/',
    title: '首页',
  },
  {
    id: '#data-detail',
    title: '数据详情',
  },
  {
    id: '#latest-block',
    title: '最新区块',
  },
  {
    id: '/d2d/dashboard',
    title: 'D2D 入口',
  },
];

class HomeLayout extends Component<Props, any> {
  handleMenuClick = ({ item, key, keyPath }) => {
    console.log(item, key, keyPath);
    if (/^#/.test(key)) {
      document
        .querySelector(key)
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  render() {
    const { search } = this.props;
    return (
      <Layout className="layout home-layout">
        <Header>
          <div className="home-layout-logo">
            {/* <img className="hlayout__img" src={logo} alt="logo" /> */}
            <span className="hlayout__logo ml20">德邦证券区块链</span>
          </div>

          <SearchForm search={search!} />
        </Header>

        <Content>
          <Layout>
            <Sider width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['/']}
                onClick={this.handleMenuClick}
                style={{ borderRight: 0 }}>
                {routes.map(({ id, title }) => {
                  return (
                    <Item key={id}>
                      <Link to={id}>{title}</Link>
                    </Item>
                  );
                })}
              </Menu>

              <div className="tech-support">
                <p>EverChain-Explorer 1.0</p>
                <p className="tech">技术支持—链平方</p>
              </div>
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
