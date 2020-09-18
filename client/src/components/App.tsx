import React, { useEffect } from 'react';
import { thunkSignIn } from '../store/actions/user/thunk';
import { useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import ProductList from './product/ProductList';
import ProductEdit from './product/ProductEdit';
import ProductShow from './product/ProductShow';
import OrderShow from './orders/OrderShow';
import Home from './Home';
import ProductCreate from './product/ProductCreate';
import Address from './address/AddressCreate';
import AddressEdit from './address/AddressEdit';
import history from '../history';
import AddressList from '../components/address/AddressList';
import OrderHistory from '../components/orders/OrderHistory';
import ShopCartList from './shopcart/ShopCartList';
import Loader from './Loader';
import Stripe from '../components/payment/Stripe';
import ModalError from './ModalError';

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
        <Route exact path="/address/new" component={Address} />
        <Route exact path="/address/list" component={AddressList} />
        <Route exact path="/address/edit/:id" component={AddressEdit} />
        <Route exact path="/shopcart" component={ShopCartList} />
        <Route exact path="/order/list" component={OrderHistory} />
        <Route exact path="/order/show/:id" component={OrderShow} />
        <Route exact path="/payment/:id" component={Stripe} />
        <Route path="/" component={Home} />
      </Switch>
      <ModalError />
      <Loader />
    </Router>
  );
};

export default App;
