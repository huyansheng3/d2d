import * as React from 'react';
import { connect } from 'react-redux';
import { Banner, Shop, Slogan, HomeLayout } from 'components';
import { HOME as HOME_ACTION } from 'actions';
import { homeConfig } from 'config';
import { Row, Col, Card, Table, Icon } from 'antd';
import classnames from 'classnames';
import './index.css';

const { query, queryCards, ACTION_TYPE } = HOME_ACTION;
const {
  columns,
  contractColumns,
  contractData,
  nodeListColumns,
  nodeListData,
  latestBlockColumns,
  blockDetail,
} = homeConfig;

interface Props {
  query: (value: any) => any;
  queryCards: (value: any) => any;
  home: any;
}

const mapDispatchToProps = dispatch => ({
  query: value => dispatch(query(value)),
  queryCards: value => dispatch(queryCards(value)),
});

const mapStateToProps = ({ home }) => ({ home });

const cardInfos = [
  {
    title: '节点',
    count: 2,
    name: 'node',
    icon: 'icon-nodejs',
  },
  {
    title: '区块',
    count: 2,
    name: 'block',
    icon: 'icon-blocks_i',
  },
  {
    title: '交易',
    count: 2,
    name: 'exchange',
    icon: 'icon-exchange',
  },
  {
    title: '智能合约',
    count: 2,
    name: 'contract',
    icon: 'icon-contract',
  },
];

class Home extends React.Component<Props, any> {
  componentDidMount() {
    this.props.query({});
    this.props.queryCards({});
  }
  render() {
    let { home } = this.props;
    const { dataDetail, loading, cards } = home;
    return (
      <HomeLayout>
        <div className="home">
          <Row className="home__container home__cards" gutter={16}>
            {cardInfos.map(card => {
              return (
                <Col span={6} key={card.title}>
                  <div className="hcards__card">
                    <Row type="flex" align="middle" justify="space-between">
                      <Col>
                        <i className={classnames('iconfont', card.icon)} />
                      </Col>
                      <Col>
                        <p className="hccard__desc hccard__title">
                          {card.title}
                        </p>
                        <p className="hccard__desc hccard__count">
                          {loading[ACTION_TYPE.QUERY_CARDS] ? (
                            <Icon type="loading" />
                          ) : (
                            cards[card.name]
                          )}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              );
            })}
          </Row>
          <div className="home__container home__data-detail">
            <h2>数据详情</h2>
            <Table
              loading={loading[ACTION_TYPE.QUERY]}
              columns={columns}
              dataSource={dataDetail}
              rowKey="id"
            />
          </div>
          <Row
            gutter={24}
            type="flex"
            align="middle"
            className="home__container ">
            <Col span={12}>
              <h4>智能合约列表</h4>
              <Table
                columns={contractColumns}
                dataSource={contractData}
                pagination={false}
              />
            </Col>
            <Col span={12}>
              <h4>节点数据</h4>
              <Table
                columns={nodeListColumns}
                dataSource={nodeListData}
                pagination={false}
              />
            </Col>
          </Row>

          <div className="home__container">
            <h4>最新区块</h4>

            <Table columns={latestBlockColumns} dataSource={[]} />
          </div>

          <div className="home__container">
            <h2>区块详情</h2>

            <dl className="common-dl">
              {blockDetail.map(item => {
                return (
                  <div key={item.label}>
                    <dt>{item.label}:</dt>
                    <dd>{item.value || '-'}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </HomeLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
