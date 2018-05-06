import * as React from 'react';
import LoginMonitor from './LoginMonitor';
import OperateMonitor from './OperateMonitor';
import { Route, Link } from 'react-router-dom';

const routes = [
  {
    id: 'loginMonitor',
    dom: LoginMonitor,
  },
  {
    id: 'operateMonitor',
    dom: OperateMonitor,
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
