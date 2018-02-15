import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import AppRoutes from './Routes';

class BooksApp extends React.Component {
  state = {
  };

  render() {
    return (
      <div className="app">
        <Router history={createBrowserHistory()}>
          <AppRoutes />
        </Router>
      </div>
    );
  }
}

export default BooksApp;
