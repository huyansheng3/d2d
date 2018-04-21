import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal } from 'antd';
import { queryUsers, ACTION_TYPE } from 'actions/user';
import { columns } from 'config/account-manager';
import QueryForm from './QueryForm';
import CreateUser from './CreateUser';

interface Props {
  queryUsers: (data: any) => any;
  user: any;
}

const mapDispatchToProps = dispatch => ({
  queryUsers: value => dispatch(queryUsers(value)),
});

const mapStateToProps = ({ user }) => ({ user });

class UserManage extends React.Component<Props, {}> {
  state = {
    createUserVisible: false,
  };

  componentDidMount() {
    this.props.queryUsers({});
  }

  handleCreateClick = e => {
    this.setState({ createUserVisible: true });
  };

  onCancel = e => {
    this.setState({ createUserVisible: false });
  };

  onOk = e => {
    this.setState({ createUserVisible: false });
  };

  render() {
    let { user } = this.props;
    const { users, loading } = user;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        );
      },
      getCheckboxProps: record => ({
        name: record.name,
      }),
    };

    return (
      <div className="user-manager">
        <QueryForm />
        <div className="operate">
          <Button type="primary" onClick={this.handleCreateClick}>
            创建
          </Button>
          <Button type="primary">编辑</Button>
          <Button type="primary">重置密码</Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={users}
        />

        <CreateUser
          isLoading={loading[ACTION_TYPE.CREATE_USER]}
          onCancel={this.onCancel}
          onOk={this.onOk}
          visible={this.state.createUserVisible}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
