import * as React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, message } from 'antd';
import * as copy from 'copy-to-clipboard';
import { HEAD_LINK, HELP_NUMBER } from 'config';
const { Header } = Layout;

interface Props {
    match: any,
    user: any
}

export default class SealHeader extends React.Component<Props, {}> {
    copyHelp = e => {
        copy(HELP_NUMBER)
        message.info('电话已复制到剪贴板')
    }
    render() {
        let { match, user } = this.props;
        return (
            <Header className="head">
                <Menu
                    mode="horizontal"
                    theme="dark"
                    defaultSelectedKeys={['0']}>
                    <Menu.Item key="0"><Link to={`${match.url}`}>首页</Link></Menu.Item>
                    <Menu.Item><Link to={`${match.url}/assets`}>资产超市</Link></Menu.Item>
                    <Menu.Item><Link to={`${match.url}/docs`}>相关文档</Link></Menu.Item>
                    <Menu.Item><Link to={`${match.url}/palace`}>
                        {user.name ? `${user.name}的工作台` : '登录/注册'}
                    </Link></Menu.Item>
                    <Menu.Item><Link to={HEAD_LINK} target="_blank">区块链浏览器</Link></Menu.Item>
                    <Menu.Item><label onClick={this.copyHelp}>咨询电话{HELP_NUMBER}</label></Menu.Item>
                </Menu>
            </Header>
        )}
}

