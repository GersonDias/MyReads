import React from 'react';
import ListBooks from './components/ListBooks';
import Search from './components/Search';
import { Switch, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={ListBooks} exact={true} />
      <Route path="/search" component={Search} />
    </Switch>
  );
};

export default AppRoutes;
