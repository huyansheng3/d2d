import * as React from 'react';
import AuthManage from './AuthManage';
import BasicInfo from './BasicInfo';
import ResetPassword from './ResetPassword';
import UserManage from './UserManage';
import { Route, Link } from 'react-router-dom';

const routes = [
  {
    id: 'authManage',
    dom: AuthManage,
  },
  {
    id: 'userManage',
    dom: UserManage,
  },
  {
    id: 'basicInfo',
    dom: BasicInfo,
  },
  {
    id: 'resetPassword',
    dom: ResetPassword,
  },
];

interface Props {
  match: any;
}

class AccountManager extends React.Component<Props, {}> {
  render() {
    console.log(this.props);
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
