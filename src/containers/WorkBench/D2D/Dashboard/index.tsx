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

import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';

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

const basicInfos = [{
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
}]

// 数据源
const data = [
  { genre: 'Sports', sold: 275, income: 2300 },
  { genre: 'Strategy', sold: 115, income: 667 },
  { genre: 'Action', sold: 120, income: 982 },
  { genre: 'Shooter', sold: 350, income: 5271 },
  { genre: 'Other', sold: 150, income: 3710 }
];

// 定义度量
const cols = {
  sold: { alias: '销售量' },
  genre: { alias: '游戏种类' }
};

class CorpAccount extends React.Component<Props, any> {
  state = {
    agree: false,
    imageUrl: '',
  };
  sendVerifyCode = e => {
    e.preventDefault();
    let { form: { validateFields }, sendVerify } = this.props;
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
    let { form: { validateFields }, onSubmit } = this.props;
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
            <Card className="dashboard__card" title="基本信息" hoverable bordered={false}>
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
            <Card className="dashboard__card" title="数据统计" hoverable bordered={false}>
              <Row gutter={16}>
                <Col span={8}>
                  <p>数据表</p>
                  <p>10</p>
                </Col>
                <Col span={8}>
                  <p>已授权项目</p>
                  <p>2</p></Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <div className="mt20">
          <h4>权限清单</h4>
        </div>

        <div className="mt20">
          <Card title="图表" hoverable bordered={false}>
            <Row gutter={16}>
              <Col span={12}>

                <Chart width={600} height={500} data={data} >
                  <Axis name="genre" />
                  <Axis name="sold" />
                  <Legend position="top" />
                  <Tooltip />
                  <Geom type="interval" position="genre*sold" color="genre" />
                </Chart>
              </Col>
              <Col span={12}>
                xxxx
                </Col>
            </Row>
          </Card>
        </div>

      </div >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CorpAccount);
