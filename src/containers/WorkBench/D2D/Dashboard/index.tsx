import * as React from 'react';
import { connect } from 'react-redux';

import { Divider, Row, Col, message, Card } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { register, sendVerifyCode, SMS_TYPE } from 'actions/user';
import {
  parseInput,
  parseRadio,
  parseSelect,
  parseCascader,
  parseDatePicker,
} from 'utils/Form';
import { queryProduct, queryTables } from 'actions/query-module';
import './style.css';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
} from 'bizcharts';
import { DataView } from '@antv/data-set';

interface Props extends FormComponentProps {
  onSubmit: (value: any) => any;
  sendVerify: (value: {}) => any;
  switchMode: () => void;
  configs: ReadonlyArray<any>;
  parseInput: (config: {}, form: {}, formItemLayout?: {}) => any;
  user: any;
  queryProduct: (data: any) => any;
  queryTables: () => any;
  queryModule: any;
}

const mapDispatchToProps = dispatch => ({
  onSubmit: value => dispatch(register(value)),
  sendVerify: value => dispatch(sendVerifyCode(value)),
  queryProduct: value => dispatch(queryProduct(value)),
  queryTables: () => dispatch(queryTables()),
});

const mapStateToProps = ({ user, queryModule }) => ({ user, queryModule });

const data = [
  { country: '中标项目', year: '1750', value: 502 },
  { country: '中标项目', year: '1800', value: 635 },
  { country: '中标项目', year: '1850', value: 809 },
  { country: '中标项目', year: '1900', value: 5268 },
  { country: '中标项目', year: '1950', value: 4400 },
  { country: '中标项目', year: '1999', value: 3634 },
  { country: '中标项目', year: '2050', value: 947 },
  { country: '公司资质', year: '1750', value: 106 },
  { country: '公司资质', year: '1800', value: 107 },
  { country: '公司资质', year: '1850', value: 111 },
  { country: '公司资质', year: '1900', value: 1766 },
  { country: '公司资质', year: '1950', value: 221 },
  { country: '公司资质', year: '1999', value: 767 },
  { country: '公司资质', year: '2050', value: 133 },
  { country: '公司荣誉', year: '1750', value: 163 },
  { country: '公司荣誉', year: '1800', value: 203 },
  { country: '公司荣誉', year: '1850', value: 276 },
  { country: '公司荣誉', year: '1900', value: 628 },
  { country: '公司荣誉', year: '1950', value: 547 },
  { country: '公司荣誉', year: '1999', value: 729 },
  { country: '公司荣誉', year: '2050', value: 408 },
  { country: '采购订单信息', year: '1750', value: 200 },
  { country: '采购订单信息', year: '1800', value: 200 },
  { country: '采购订单信息', year: '1850', value: 200 },
  { country: '采购订单信息', year: '1900', value: 460 },
  { country: '采购订单信息', year: '1950', value: 230 },
  { country: '采购订单信息', year: '1999', value: 300 },
  { country: '采购订单信息', year: '2050', value: 300 },
];
const cols = {
  year: {
    type: 'linear',
    tickInterval: 50,
  },
};

const { Html } = Guide;

const percentData = [
  { item: '中标项目', count: 40 },
  { item: '公司资质', count: 21 },
  { item: '采购订单信息', count: 17 },
  { item: '销售订单信息', count: 13 },
  { item: '供应商基础信息', count: 9 },
];
const dv = new DataView();

dv.source(percentData).transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent',
});

const percentCols = {
  percent: {
    formatter: val => {
      val = val * 100 + '%';
      return val;
    },
  },
};

class CorpAccount extends React.Component<Props, any> {
  state = {
    agree: false,
    imageUrl: '',
  };
  sendVerifyCode = e => {
    e.preventDefault();
    let {
      form: { validateFields },
      sendVerify,
    } = this.props;
    validateFields(
      ['mobile'],
      (err, value) =>
        err
          ? null
          : sendVerify({
              ...value,
              smsType: SMS_TYPE.SIGNUP,
            })
    );
  };

  onSubmit = e => {
    e.preventDefault();
    let {
      form: { validateFields },
      onSubmit,
    } = this.props;
    console.log(this.state.agree);
    if (!this.state.agree) {
      message.warning('请勾选同意注册协议');
    } else {
      validateFields((err, value) => (err ? null : onSubmit(value)));
    }
  };

  switchMode = e => {
    e.preventDefault();
    let { switchMode } = this.props;
    switchMode();
  };

  changeAgree = e => {
    this.setState({
      agree: e.target.checked,
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  parseConfig = config => {
    let { domType = '' } = config;
    const { form } = this.props;
    switch (domType) {
      case 'cascader':
        return parseCascader(config, form);
      case 'radio':
        return parseRadio(config, form);
      case 'select':
        return parseSelect(config, form);
      case 'datePicker':
        return parseDatePicker(config, form);
      default:
        return parseInput(config, form);
    }
  };

  componentDidMount() {
    this.props.queryProduct({});
    this.props.queryTables();
  }

  render() {
    const { user, queryModule } = this.props;
    const { login_time } = user.user;
    const { products, tables } = queryModule;

    const basicInfos = [
      {
        label: '基本信息',
        value: '德邦证券',
      },
      {
        label: '姓名',
        value: '崔经理',
      },
      {
        label: '角色',
        value: '管理员',
      },
      {
        label: '上次登录时间',
        value: login_time,
      },
    ];

    return (
      <div className="dashboard">
        <Row gutter={16}>
          <Col span={12}>
            <Card
              className="dashboard__card"
              title="基本信息"
              hoverable
              bordered={false}>
              <dl className="common-dl">
                {basicInfos.map(item => {
                  return (
                    <div key={item.label}>
                      <dt>{item.label}:</dt>
                      <dd>{item.value || '-'}</dd>
                    </div>
                  );
                })}
              </dl>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              className="dashboard__card"
              title="数据统计"
              hoverable
              bordered={false}>
              <Row gutter={16}>
                <Col span={8} className="dcard__item">
                  <h3>数据表</h3>
                  <p>10</p>
                </Col>
                <Col
                  span={8}
                  offset={2}
                  className="dcard__item dcard__item--second">
                  <h3>产品</h3>
                  <p>2</p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <div className="mt20">
          <Card title="权限清单" hoverable bordered={false}>
            <Row type="flex" align="top" justify="start">
              <Col span={6} className="dashboard-list">
                <h3>数据表清单</h3>
                <p>表名</p>
                <ul>
                  <ul>
                    {tables.map(p => (
                      <li key={p.productName}>{p.productName}</li>
                    ))}
                  </ul>
                </ul>
              </Col>
              <Col span={6} offset={2} className="dashboard-list">
                <h3>产品清单</h3>
                <p>项目名称</p>
                <ul>{products.map(p => <li key={p.prjNo}>{p.prjName}</li>)}</ul>
              </Col>
            </Row>
          </Card>
        </div>

        <div className="mt20">
          <Card title="图表" hoverable bordered={false}>
            <Row gutter={16} type="flex" align="middle" justify="space-around">
              <Col span={12}>
                <Chart
                  height={500}
                  data={dv}
                  padding={[80, 100, 80, 80]}
                  forceFit>
                  <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                  <Axis name="percent" />
                  <Legend
                    position="right"
                    offsetY={-window.innerHeight / 2 + 120}
                    offsetX={-100}
                  />
                  <Tooltip
                    showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                  />
                  <Geom
                    type="intervalStack"
                    position="percent"
                    color="item"
                    tooltip={[
                      'item*percent',
                      (item, percent) => {
                        percent = percent * 100 + '%';
                        return {
                          name: item,
                          value: percent,
                        };
                      },
                    ]}
                    style={{ lineWidth: 1, stroke: '#fff' }}>
                    <Label
                      content="percent"
                      formatter={(val, item) => {
                        return item.point.item + ': ' + val;
                      }}
                    />
                  </Geom>
                </Chart>
              </Col>
              <Col span={12}>
                <Chart
                  width={400}
                  height={300}
                  style={{ maxWidth: '90%' }}
                  data={data}
                  forceFit>
                  <Axis name="year" />
                  <Axis name="value" />
                  <Legend />
                  <Tooltip />
                  <Geom type="area" position="year*value" color="country" />
                  <Geom
                    type="line"
                    position="year*value"
                    size={2}
                    color="country"
                  />
                </Chart>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CorpAccount);
