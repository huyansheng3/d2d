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
                <a target="_blank" href="http://www.s-labs.cn/sy">
                  链平方链接
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="http://www.tebon.com.cn/">
                  文档
                </a>
              </li>
            </ul>
          </Col>
          <Col span={16} className="lfooter__info lfooter__service">
            <h2>客服支持</h2>
            <ul>
              <li>客服：0592-5929720 </li>
              <li>地址: 上海市静安区平型关路108创意广场37号品座6层</li>
            </ul>
          </Col>
          <Col span={4} className="lfooter__wechat">
            {/* <img src={wechat} alt="wechat" /> */}
          </Col>
        </Row>
        <div className="lfooter__company">
          <p> ©2018 链平方科技有限公司 </p>
        </div>
      </Footer>
    );
  }
}

export default CustomFooter;
