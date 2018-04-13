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
import { WorkBench } from 'containers';

export default class App extends React.Component {
    render() {
        console.log('render app')
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/d2d" component={WorkBench}/>
                        <Redirect to="/d2d"/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

