import * as React from 'react';
import Subscribe from './Subscribe';
import Upload from './Upload';
import Node from './Node';
import { Route, Link } from 'react-router-dom';

const routes = [
  {
    id: 'subscribe',
    dom: Subscribe,
  },
  {
    id: 'upload',
    dom: Upload,
  },
  {
    id: 'node',
    dom: Node,
  },
];

interface Props {
  match: any;
}

class QueryModule extends React.Component<Props, {}> {
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

export default QueryModule;
