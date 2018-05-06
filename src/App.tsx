import * as React from 'react';
import './App.css';
import './custom.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { WorkBench, Home, BlockQuery } from 'containers';
import api from 'config/api';
import { wrapServer } from 'utils/Axios';
import './init-axios';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/blockQuery" component={BlockQuery} />
            <Route path="/d2d" component={WorkBench} />
            <Route path="/" component={Home} />
            <Redirect to="/d2d" />
          </Switch>
        </Router>
      </Provider>
    );
  }

  componentDidMount() {
    wrapServer({
      method: 'get',
      url: api.nodes,
    }).then(data => {
      if (!data.data) {
        wrapServer({ url: api.nodes });
      }
    });
  }
}
