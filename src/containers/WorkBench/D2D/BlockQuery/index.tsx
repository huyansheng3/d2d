import * as React from 'react';
import BlockList from './BlockList';
import BlockDetail from './BlockDetail';
import { Route, Link } from 'react-router-dom';

const routes = [
  {
    id: 'blockList',
    dom: BlockDetail,
  },
  {
    id: 'blockDetail',
    dom: BlockDetail,
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
