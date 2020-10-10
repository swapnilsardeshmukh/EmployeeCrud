import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import './index.css';
import App from './App';
import Edit from './Edit';
import View from './View';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
      <Route exact path="/" component={App} />
      <Route path="/edit/:email" component={Edit} render={(props) => <Edit {...props} />}/>
      <Route path="/view/:_id" component={View} render={(props) => <View {...props} />}/>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
