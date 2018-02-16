import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import ListBooks from './components/ListBooks';
import Search from './components/Search';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  render() {
    return (
      <div className="app">
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route
              path="/"
              render={() => (
                <ListBooks
                  counter={this.state.counter}
                  addCounter={() =>
                    this.setState({ counter: this.state.counter + 1 })
                  }
                />
              )}
              exact={true}
            />
            <Route path="/search" render={() => <Search />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
