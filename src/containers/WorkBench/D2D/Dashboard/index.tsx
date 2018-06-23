import * as React from 'react';
import { connect } from 'react-redux';
import { Divider, Row, Col, message, Card, Carousel } from 'antd';
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
import { clone, isArray, random } from 'lodash';
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

    let offset = 4,
      showTables: any[] = [],
      j = 0;
    for (let i = 0, len = tables.length; i < len; i++) {
      if (showTables[j]) {
        showTables[j].push(tables[i]);
      } else {
        showTables[j] = [tables[i]];
      }
      if ((i + 1) % offset === 0) {
        j += 1;
      }
    }

    const data = tables.map(table => {
      return {
        product: table.productName,
        count: random(20, 100),
      };
    });

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
                  <p>{tables.length}</p>
                </Col>
                <Col
                  span={8}
                  offset={2}
                  className="dcard__item dcard__item--second">
                  <h3>产品</h3>
                  <p>{products.length}</p>
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
                <div>
                  <Carousel autoplay>
                    {showTables.map((item, index) => {
                      return (
                        <div className="dlcarousel__item" key={index}>
                          <ul>
                            {(item as any).map(p => (
                              <li key={p.productName}>{p.productName}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
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
            <Chart height={400} data={data} forceFit>
              <Axis name="product" />
              <Axis name="count" />
              <Tooltip crosshairs={{ type: 'y' }} />
              <Geom type="interval" position="product*count" />
            </Chart>
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
