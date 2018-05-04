import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Progress } from 'antd';
import { queryBi, ACTION_TYPE } from 'actions/query-module';
import { ReactInterval } from 'components';
import './index.css';

interface Props {
  query: (data: any) => any;
  queryModule: any;
}

const mapDispatchToProps = dispatch => ({
  query: value => dispatch(queryBi(value)),
});

const mapStateToProps = ({ queryModule }) => ({ queryModule });

class BiQuery extends React.Component<Props, any> {
  state = {
    modalVisible: false,
    percent: 0,
    enabled: false,
  };

  interval;

  componentDidMount() {
    this.props.query({});
  }

  handleDownloadClick = e => {
    this.setState({ modalVisible: true, enabled: true });
    // this.interval = setInterval(this.updateProgerss, 200);
  };

  cleareProgress = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  onOk = e => {
    this.setState({ modalVisible: false, percent: 0, enabled: false });
    // this.cleareProgress();
  };

  onCancel = e => {
    this.setState({ modalVisible: false, percent: 0, enabled: false });
    // this.cleareProgress();
  };

  updateProgerss = () => {
    console.log('updateProgerss');
    // console.log(this.state);
    if (this.state.percent < 100) {
      this.setState({
        percent: Number(+this.state.percent + +Math.random() * 2).toFixed(1),
      });
    }
  };

  render() {
    let { queryModule } = this.props;
    const { biList, loading } = queryModule;

    const biColumns = [
      {
        title: '项目名称',
        dataIndex: 'apiName',
        key: 'apiName',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: '20%',
        render: (operate, record, index) => {
          return (
            <Button type="primary" onClick={this.handleDownloadClick}>
              下载
            </Button>
          );
        },
      },
    ];

    return (
      <div>
        <Table
          loading={loading[ACTION_TYPE.QUERY]}
          columns={biColumns}
          dataSource={biList}
          rowKey="id"
        />

        <Modal
          visible={this.state.modalVisible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          maskClosable={false}
          footer={null}>
          <div className="download-modal-content">
            <h2>{this.state.percent < 100 ? '导出中' : '导出成功'}</h2>
            <Progress
              className="mt20"
              type="circle"
              percent={this.state.percent}
            />

            <ReactInterval
              immediate
              timeout={20}
              enabled={this.state.enabled && this.state.percent < 100}
              callback={this.updateProgerss}
            />

            <p className="mt20">
              {this.state.percent >= 100 &&
                '导出报表数量220，匹配数据条数220，未匹配数据条数0'}
            </p>

            {this.state.percent >= 100 && (
              <Button
                className="mt20"
                type="primary"
                href="http://110.80.142.87:10014/download">
                下载
              </Button>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BiQuery);
