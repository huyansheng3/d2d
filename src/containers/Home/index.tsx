import * as React from 'react';
import { connect } from 'react-redux';
import { Banner, Shop, Slogan, HomeLayout, ReactInterval } from 'components';
import {
  query,
  queryCards,
  queryLastBlock,
  queryBlockByLast,
  search,
  ACTION_TYPE,
} from 'actions/home';
import { homeConfig } from 'config';
import { Row, Col, Card, Table, Icon } from 'antd';
import classnames from 'classnames';
import ReactTimeout from 'react-timeout';
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

const cardInfos = [
  {
    title: '区块链节点',
    count: 2,
    name: 'node',
    icon: 'icon-nodejs',
    color: '#24ae88',
  },
  {
    title: '数据网关',
    count: 2,
    name: 'd2d',
    icon: 'icon-nodejs',
    color: '#f98d33',
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
];

interface Props {
  query: (value: any) => any;
  queryCards: (value: any) => any;
  queryLastBlock: (value: any) => any;
  queryBlockByLast: (value: any) => any;

  search: (value: any) => any;
  setInterval: (callback: Function, timer: number) => any;
  home: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  query: value => dispatch(query(value)),
  queryCards: value => dispatch(queryCards(value)),
  queryLastBlock: value => dispatch(queryLastBlock(value)),
  queryBlockByLast: value => dispatch(queryBlockByLast(value)),
  search: value => dispatch(search(value)),
});

const mapStateToProps = ({ home, ui }) => ({ home, ui });

class Home extends React.Component<Props, any> {
  componentDidMount() {
    this.props.queryCards({});
    this.props.queryLastBlock({ rownum: 10 });
    this.props.queryBlockByLast({ data: { rownum: 10 } });
    this.props.setInterval(
      () => this.props.queryLastBlock({ rownum: 10 }),
      60 * 1000
    );
  }

  render() {
    let { home, ui } = this.props;
    const { dataDetail, cards, lastBlock, blockByLast } = home;
    const { loading, isLoading } = ui;
    return (
      <HomeLayout search={this.props.search}>
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
          <div id="data-detail" className="home__container home__data-detail">
            <h2>数据详情</h2>
            <Table
              loading={
                loading[ACTION_TYPE.QUERY_LAST_BLOCK] ||
                loading[ACTION_TYPE.SEARCH]
              }
              columns={columns}
              dataSource={lastBlock}
            />
          </div>
          <Row type="flex" align="middle" className="home__container ">
            <Col span={12}>
              <h2 id="contract">区块链节点</h2>
              <Table
                columns={contractColumns}
                dataSource={contractData}
                pagination={false}
              />
            </Col>
            <Col span={12}>
              <h2>数据网关节点</h2>
              <Table
                columns={nodeListColumns}
                dataSource={nodeListData}
                pagination={false}
              />
            </Col>
          </Row>

          <div className="home__container">
            <h2 id="latest-block">最新区块</h2>

            <Table
              loading={loading[ACTION_TYPE.QUERY_BLOCK_BY_LAST]}
              columns={latestBlockColumns}
              dataSource={blockByLast}
              pagination={false}
            />
          </div>
        </div>
      </HomeLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactTimeout(Home));
