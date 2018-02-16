import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import ListBooks from './components/ListBooks';
import Search from './components/Search';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route path="/" component={ListBooks} exact={true} />
            <Route path="/search" component={Search} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
