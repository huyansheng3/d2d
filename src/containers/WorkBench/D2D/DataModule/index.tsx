import * as React from 'react';
import DataUpload from './DataUpload';
import FileUpload from './FileUpload';
import { Route, Link } from 'react-router-dom';

const routes = [
  {
    id: 'dataUpload',
    dom: DataUpload,
  },
  {
    id: 'fileUpload',
    dom: FileUpload,
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
