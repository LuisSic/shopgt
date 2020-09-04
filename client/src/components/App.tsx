import React, { useEffect } from 'react';
import { thunkSignIn } from '../store/actions/user/thunk';
import { useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import ProductList from './product/ProductList';
import ProductEdit from './product/ProductEdit';
import ProductShow from './product/ProductShow';
import Home from './Home';
import ProductCreate from './product/ProductCreate';
import Address from './address/AddressCreate';
import history from '../history';
import AddressList from '../components/address/AddressList';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkSignIn());
  }, [dispatch]);
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route exact path="/products/new" component={ProductCreate} />
        <Route exact path="/products/edit/:id" component={ProductEdit} />
        <Route exact path="/products/view/:id" component={ProductShow} />
        <Route exact path="/products/list" component={ProductList} />
        <Route exact path="/addresses/new" component={Address} />
        <Route exact path="/addresses/list" component={AddressList} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
