import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Switch, notification } from 'antd';
import {
  queryUsers,
  createUser,
  queryRoles,
  updateUser,
  updateUserStatus,
  resetPassword,
  ACTION_TYPE,
} from 'actions/account-manager';
import { columns } from 'config/account-manager';
import QueryForm from './QueryForm';
import CreateUser from './CreateUser';
import ResetPassword from './ResetPassword';
import { find, head, isEmpty } from 'lodash';

import { RowSelectionType } from 'antd/lib/table';

interface Props {
  queryUsers: (data: any) => any;
  createUser: (opts: any) => any;
  updateUser: (opts: any) => any;
  updateUserStatus: (opts: any) => any;
  resetPassword: (opts: any) => any;
  queryRoles: () => any;
  accountManager: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryUsers: opts => dispatch(queryUsers(opts)),
  createUser: opts => dispatch(createUser(opts)),
  updateUser: opts => dispatch(updateUser(opts)),
  resetPassword: opts => dispatch(resetPassword(opts)),
  updateUserStatus: opts => dispatch(updateUserStatus(opts)),
  queryRoles: () => dispatch(queryRoles()),
});

const mapStateToProps = ({ accountManager, ui }) => ({ accountManager, ui });

type currentUserType = {
  userName?: string;
  mobile?: string;
  email?: string;
  contactName?: string;
  corporateName?: string;
  roleId?: string;
};

const initCurrentUser: currentUserType = {};

class UserManage extends React.Component<Props, {}> {
  state = {
    createUserVisible: false,
    resetVisible: false,
    currentUser: initCurrentUser,
  };

  componentDidMount() {
    this.props.queryUsers({
      params: {
        name: '',
        status: '',
      },
    });
    this.props.queryRoles();
  }

  handleCreateClick = e => {
    this.setState({ createUserVisible: true });
  };

  handleModalClose = () => {
    this.setState({ createUserVisible: false });
  };

  handleStatusSet = ({ checked, id }) => {
    this.props
      .updateUserStatus({
        data: { status: checked },
        params: { id },
      })
      .then(res => {
        notification.success({
          message: 'Success',
          description: checked ? '启用成功' : '停用成功',
        });
      });
  };

  handleResetClick = e => {
    this.setState({ resetVisible: true });
  };

  handleResetClose = e => {
    this.setState({ resetVisible: false });
  };
  get userColumns() {
    const { loading } = this.props.ui;
    const { roles } = this.props.accountManager;
    return [
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '状态',
        dataIndex: 'enabledState',
        key: 'enabledState',
        render: (enabledState, record, index) => {
          return Boolean(enabledState) ? '启用' : '停用';
        },
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '联系人姓名',
        dataIndex: 'contactName',
        key: 'contactName',
      },
      {
        title: '角色',
        dataIndex: 'roleId',
        key: 'roleId',
        render: (roleId, record, index) => {
          const role = find(roles, { id: roleId }) || {};
          return role.roleName || '-';
        },
      },
      {
        title: '是否启用',
        dataIndex: 'operate',
        key: 'operate',
        render: (operate, record, index) => {
          return (
            <Switch
              checked={Boolean(record.enabledState)}
              onChange={checked =>
                this.handleStatusSet({ checked, id: record.id })
              }
            />
          );
        },
      },
    ];
  }

  render() {
    let { accountManager, ui } = this.props;
    const { roles, corporateInfo, users } = accountManager;
    const { loading } = ui;

    const rowSelectionType: RowSelectionType = 'radio';
    const rowSelection = {
      type: rowSelectionType,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRows);
        this.setState({ currentUser: head(selectedRows) });
      },
      getCheckboxProps: record => ({
        name: record.name,
      }),
    };

    return (
      <div className="user-manager">
        <QueryForm queryUsers={this.props.queryUsers} loading={false} />
        <div className="operate">
          <Button type="primary" onClick={this.handleCreateClick}>
            创建
          </Button>
          <Button
            type="primary"
            onClick={this.handleCreateClick}
            disabled={isEmpty(this.state.currentUser)}>
            编辑
          </Button>
          <Button
            type="primary"
            onClick={this.handleResetClick}
            disabled={isEmpty(this.state.currentUser)}>
            重置密码
          </Button>
        </div>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={this.userColumns}
          dataSource={users}
          loading={loading[ACTION_TYPE.QUERY_USERS]}
        />

        <CreateUser
          createUser={this.props.createUser}
          updateUser={this.props.updateUser}
          currentUser={this.state.currentUser}
          isLoading={
            loading[ACTION_TYPE.CREATE_USER] || loading[ACTION_TYPE.UPDATE_USER]
          }
          roles={roles}
          onCancel={this.handleModalClose}
          onOk={this.handleModalClose}
          visible={this.state.createUserVisible}
        />

        <ResetPassword
          resetPassword={this.props.resetPassword}
          isLoading={loading[ACTION_TYPE.RESET_PASSWORD]}
          currentUser={this.state.currentUser}
          onOk={this.handleResetClose}
          onCancel={this.handleResetClose}
          visible={this.state.resetVisible}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
