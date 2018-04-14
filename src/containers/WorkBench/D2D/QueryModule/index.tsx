import * as React from 'react';
import BiQuery from './BiQuery';
import DataVerify from './DataVerify';
import ApiList from './ApiList';
import { Route, Link } from 'react-router-dom';

const routes = [
  {
    id: 'biQuery',
    dom: BiQuery,
  },
  {
    id: 'dataVerify',
    dom: DataVerify,
  },
  {
    id: 'apiList',
    dom: ApiList,
  },
];

interface Props {
  match: any;
}

class QueryModule extends React.Component<Props, {}> {
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

export default QueryModule;
