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
}

const mapDispatchToProps = dispatch => ({
  onSubmit: value => dispatch(register(value)),
  sendVerify: value => dispatch(sendVerifyCode(value)),
});

const mapStateToProps = () => ({});

const basicInfos = [
  {
    label: '基本信息',
    value: 'XX公司',
  },
  {
    label: '姓名',
    value: '黄 XX',
  },
  {
    label: '角色',
    value: '管理员/操作员',
  },
  {
    label: '上次登录时间',
    value: 'YYYY-MM-DD HH:MM:SS',
  },
];

const data = [
  { country: 'Asia', year: '1750', value: 502 },
  { country: 'Asia', year: '1800', value: 635 },
  { country: 'Asia', year: '1850', value: 809 },
  { country: 'Asia', year: '1900', value: 5268 },
  { country: 'Asia', year: '1950', value: 4400 },
  { country: 'Asia', year: '1999', value: 3634 },
  { country: 'Asia', year: '2050', value: 947 },
  { country: 'Africa', year: '1750', value: 106 },
  { country: 'Africa', year: '1800', value: 107 },
  { country: 'Africa', year: '1850', value: 111 },
  { country: 'Africa', year: '1900', value: 1766 },
  { country: 'Africa', year: '1950', value: 221 },
  { country: 'Africa', year: '1999', value: 767 },
  { country: 'Africa', year: '2050', value: 133 },
  { country: 'Europe', year: '1750', value: 163 },
  { country: 'Europe', year: '1800', value: 203 },
  { country: 'Europe', year: '1850', value: 276 },
  { country: 'Europe', year: '1900', value: 628 },
  { country: 'Europe', year: '1950', value: 547 },
  { country: 'Europe', year: '1999', value: 729 },
  { country: 'Europe', year: '2050', value: 408 },
  { country: 'Oceania', year: '1750', value: 200 },
  { country: 'Oceania', year: '1800', value: 200 },
  { country: 'Oceania', year: '1850', value: 200 },
  { country: 'Oceania', year: '1900', value: 460 },
  { country: 'Oceania', year: '1950', value: 230 },
  { country: 'Oceania', year: '1999', value: 300 },
  { country: 'Oceania', year: '2050', value: 300 },
];
const cols = {
  year: {
    type: 'linear',
    tickInterval: 50,
  },
};

const { Html } = Guide;

const percentData = [
  { item: '事例一', count: 40 },
  { item: '事例二', count: 21 },
  { item: '事例三', count: 17 },
  { item: '事例四', count: 13 },
  { item: '事例五', count: 9 },
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

  render() {
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
                  <h3>已授权项目</h3>
                  <p>2</p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <div className="mt20">
          <Card title="权限清单" hoverable bordered={false}>
            <Row type="flex" align="middle" justify="start">
              <Col span={6} className="dashboard-list">
                <h3>数据表清单</h3>
                <p>表名</p>
                <ul>
                  <li>XXXX</li>
                  <li>XXXX</li>
                  <li>XXXX</li>
                  <li>XXXX</li>
                </ul>
              </Col>
              <Col span={6} offset={2} className="dashboard-list">
                <h3>项目清单</h3>
                <p>项目名称</p>
                <ul>
                  <li>XXXX</li>
                  <li>XXXX</li>
                  <li>XXXX</li>
                  <li>XXXX</li>
                </ul>
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
                  <Guide>
                    <Html
                      position={['50%', '50%']}
                      html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>主机<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200</span>台</div>"
                      alignX="middle"
                      alignY="middle"
                    />
                  </Guide>
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
                  style={{ maxWidth: 600 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(CorpAccount);
