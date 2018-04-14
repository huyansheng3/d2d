import * as React from 'react';
import LocalMonitor from './LocalMonitor';
import BlockMonitor from './BlockMonitor';
import { Route, Link } from 'react-router-dom';

const routes = [
  {
    id: 'localMonitor',
    dom: BlockMonitor,
  },
  {
    id: 'blockMonitor',
    dom: BlockMonitor,
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
