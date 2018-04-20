import * as React from 'react';
import { connect } from 'react-redux';
import { Banner, Shop, Slogan, HomeLayout, ReactInterval } from 'components';
import { query, queryCards, queryLastBlock, ACTION_TYPE } from 'actions/home';
import { homeConfig } from 'config';
import { Row, Col, Card, Table, Icon } from 'antd';
import classnames from 'classnames';
import './index.css';

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
  queryLastBlock: (value: any) => any;
  home: any;
}

const mapDispatchToProps = dispatch => ({
  query: value => dispatch(query(value)),
  queryCards: value => dispatch(queryCards(value)),
  queryLastBlock: value => dispatch(queryLastBlock(value)),
});

const mapStateToProps = ({ home }) => ({ home });

const cardInfos = [
  {
    title: '节点',
    count: 2,
    name: 'node',
    icon: 'icon-nodejs',
    color: '#24ae88',
  },
  {
    title: '区块',
    count: 2,
    name: 'block',
    icon: 'icon-blocks_i',
    color: '#333333',
  },
  {
    title: '交易',
    count: 2,
    name: 'exchange',
    icon: 'icon-exchange',
    color: '#1c7ebb',
  },
  {
    title: '智能合约',
    count: 2,
    name: 'contract',
    icon: 'icon-contract',
    color: '#f98d33',
  },
];

class Home extends React.Component<Props, any> {
  componentDidMount() {
    // this.props.query({});
    this.props.queryCards({});
  }

  render() {
    let { home } = this.props;
    const { dataDetail, loading, cards, lastBlock } = home;
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
                        <i
                          style={{ color: card.color }}
                          className={classnames('iconfont', card.icon)}
                        />
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
            <ReactInterval
              enabled
              immediate
              timeout={60 * 1000}
              callback={() => this.props.queryLastBlock({ rownum: 10 })}
            />
            <Table
              loading={loading[ACTION_TYPE.QUERY_LAST_BLOCK]}
              columns={columns}
              dataSource={lastBlock}
              pagination={false}
              rowKey="datahash"
            />
          </div>
          <Row type="flex" align="middle" className="home__container ">
            <Col span={12}>
              <h2>智能合约列表</h2>
              <Table
                columns={contractColumns}
                dataSource={contractData}
                pagination={false}
              />
            </Col>
            <Col span={12}>
              <h2>节点数据</h2>
              <Table
                columns={nodeListColumns}
                dataSource={nodeListData}
                pagination={false}
              />
            </Col>
          </Row>

          <div className="home__container">
            <h2>最新区块</h2>

            <Table
              loading={loading[ACTION_TYPE.QUERY_LAST_BLOCK]}
              columns={latestBlockColumns}
              dataSource={lastBlock}
              pagination={false}
              rowKey="datahash"
            />
          </div>

          <div className="home__container">
            <h2>区块详情</h2>

            <dl className="common-dl">
              {blockDetail.map(item => {
                return (
                  <div className="common-dl-row" key={item.label}>
                    <dt className="common-dl-item-label">{item.label}:</dt>
                    <dd className="common-dl-item-value">
                      {item.value || '-'}
                    </dd>
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
