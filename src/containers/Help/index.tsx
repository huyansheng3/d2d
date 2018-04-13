import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import {
    Layout,
    Menu,
} from 'antd';
const { Sider } = Layout;
import { HELP_DOCS } from 'config';
import './style.css';

interface Props {
    match: any
}

export default class Help extends React.Component<Props, {}> {
    renderMenu({id, title}) {
        let { match } = this.props;
        return <Menu.Item key={id}><Link to={`${match.url}/${id}`}>{title}</Link></Menu.Item>
    }

    renderContent(id, dom) {
        let { match } = this.props;
        return <Route key={id} path={`${match.url}/${id}`} component={dom}/>
    }

    render() {
        let menus: any[] = [];
        let docs: any[] = [];
        HELP_DOCS.forEach(({id, title, dom}) => {
            menus.push({id, title})
            docs.push({id, dom})
        })
        return (
            <div className="Help">
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {menus.map( menu => this.renderMenu(menu))}
                    </Menu>
                </Sider>
                {docs.map(({id, dom}) => this.renderContent(id, dom))}
            </div>
        )
    }
}
