import * as React from 'react';
import LoginMonitor from './LoginMonitor';
import UploadMonitor from './UploadMonitor';
import DataApiMonitor from './DataApiMonitor';
import RoleManageMonitor from './RoleManageMonitor';
import UserManageMonitor from './UserManageMonitor';

import { Route, Link } from 'react-router-dom';

const routes = [
  {
    id: 'login',
    dom: LoginMonitor,
  },
  {
    id: 'upload',
    dom: UploadMonitor,
  },

  {
    id: 'dataApi',
    dom: DataApiMonitor,
  },

  {
    id: 'roleManage',
    dom: RoleManageMonitor,
  },
  {
    id: 'userManage',
    dom: UserManageMonitor,
  },
];

interface Props {
  match: any;
}

class AccountManager extends React.Component<Props, {}> {
  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        {routes.map(({ id, dom }) => {
          return <Route key={id} path={`${match.url}/${id}`} component={dom} />;
        })}
      </React.Fragment>
    );
  }
}

export default AccountManager;
