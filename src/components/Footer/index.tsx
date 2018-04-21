import React, { Component } from 'react';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd';
import classnames from 'classnames';
import './index.css';

const { Content, Sider, Header, Footer } = Layout;

interface Props {
  className?: string;
}

class CustomFooter extends Component<Props, any> {
  render() {
    const footerCls = classnames('layout__footer', this.props.className);
    return (
      <Footer className={footerCls}>
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
              <li>地址: 福建省厦门市思明区软件园二期望海路37号二层203</li>
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
    );
  }
}

export default CustomFooter;
