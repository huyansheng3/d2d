import * as React from 'react';
import Buyer from './Buyer';
import Seller from './Seller';
import { Route, Link } from 'react-router-dom';

// 根据环境变量来设置是否展示权限页面
export const NO_PERMISSION = process.env.REACT_APP_PERMISSION === 'false';

let routes: any[] = [
  {
    id: 'buyer',
    dom: Buyer,
  },
  {
    id: 'seller',
    dom: Seller,
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
