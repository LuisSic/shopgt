import React, { useEffect } from 'react';
import { ThunkSignIn } from '../store/actions/user/thunk';
import { useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import ProductList from './product/ProductList';
import Home from './Home';
import ProductCreate from './product/ProductCreate';
import history from '../history';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ThunkSignIn());
  }, [dispatch]);
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route exact path="/products/new" component={ProductCreate} />
        <Route exact path="/products/list" component={ProductList} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
