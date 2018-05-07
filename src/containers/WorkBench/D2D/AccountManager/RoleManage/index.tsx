import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, notification, Switch } from 'antd';
import {
  queryRoles,
  findRoles,
  createRole,
  updateRole,
  queryCorporate,
  updateRoleStatus,
  ACTION_TYPE,
} from 'actions/account-manager';
import QueryForm from './QueryForm';
import CreateRole from './CreateRole';
import { RowSelectionType } from 'antd/lib/table';
import { head, isEmpty } from 'lodash';

interface Props {
  queryRoles: () => any;
  findRoles: (params: any) => any;
  updateRoleStatus: (params: any) => any;
  createRole: (data: any) => any;
  updateRole: (data: any) => any;
  queryCorporate: (opts?: any) => any;
  accountManager: any;
  ui: any;
}

const mapDispatchToProps = dispatch => ({
  queryRoles: () => dispatch(queryRoles()),
  findRoles: (params: any) => dispatch(findRoles(params)),
  updateRoleStatus: (params: any) => dispatch(updateRoleStatus(params)),
  createRole: (data: any) => dispatch(createRole(data)),
  updateRole: (data: any) => dispatch(updateRole(data)),
  queryCorporate: (opts: any) => dispatch(queryCorporate(opts)),
});

const mapStateToProps = ({ accountManager, ui }) => ({ accountManager, ui });

type role = {
  id: number;
  enabledState: 0 | 1;
  roleName: string;
  createTime: string;
  corpManage: Array<number>;
  allRole: Array<number>;
};

class UserManage extends React.Component<Props, any> {
  state = {
    createRoleVisible: false,
    selectedRow: {},
    isCreateMode: false,
  };

  componentDidMount() {
    this.props.queryRoles();
    this.props.queryCorporate();
  }

  handleRoleCreate = e => {
    this.setState({ createRoleVisible: true, isCreateMode: true });
  };

  handleRoleUpdate = e => {
    this.setState({ createRoleVisible: true, isCreateMode: false });
  };

  onClose = () => {
    this.setState({ createRoleVisible: false });
  };

  handleStatusSet = ({ id, checked }) => {
    this.props
      .updateRoleStatus({
        params: { id },
        data: {
          status: checked,
        },
      })
      .then(res => {
        notification.success({
          message: 'Success',
          description: checked ? '启用成功' : '停用成功',
        });
      });
  };

  get roleColumns() {
    const { loading } = this.props.ui;
    return [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
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
        title: '创建用户',
        dataIndex: 'createUser',
        key: 'createUser',
        render: (createUser, record, index) => {
          return createUser || 'XXXXX';
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
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
    const { accountManager, ui } = this.props;
    const { roles, corporateInfo } = accountManager;
    const { loading } = ui;

    const rowSelectionType: RowSelectionType = 'radio';

    const rowSelection = {
      type: rowSelectionType,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRow: head(selectedRows) });
      },
    };

    const isDisabled = isEmpty(this.state.selectedRow);
    return (
      <div className="user-manager">
        <QueryForm
          findRoles={this.props.findRoles}
          loading={loading[ACTION_TYPE.QUERY_ROLES]}
        />
        <div className="operate">
          <Button type="primary" onClick={this.handleRoleCreate}>
            创建
          </Button>
          <Button
            disabled={isDisabled}
            type="primary"
            onClick={this.handleRoleUpdate}>
            编辑
          </Button>
        </div>

        <Table
          rowSelection={rowSelection}
          columns={this.roleColumns}
          dataSource={roles}
          loading={loading[ACTION_TYPE.QUERY_ROLES]}
          rowKey="id"
        />

        <CreateRole
          onCancel={this.onClose}
          onOk={this.onClose}
          createRole={this.props.createRole}
          updateRole={this.props.updateRole}
          visible={this.state.createRoleVisible}
          loading={loading[ACTION_TYPE.CREATE_ROLE]}
          currentRole={this.state.selectedRow}
          isCreateMode={this.state.isCreateMode}
          roles={roles}
          corporateInfo={corporateInfo}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
