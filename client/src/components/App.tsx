import React, { useEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import { thunkSignIn } from '../store/actions/user/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import ProductList from './product/ProductList';
import ProductEdit from './product/ProductEdit';
import ProductShow from './product/ProductShow';
import Home from './Home';
import ProductCreate from './product/ProductCreate';
import Address from './address/AddressCreate';
import AddressEdit from './address/AddressEdit';
import history from '../history';
import AddressList from '../components/address/AddressList';
import Modal from './Modal';
import { hideError } from '../store/actions/error/actions';
import { RootState } from '../store';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkSignIn());
  }, [dispatch]);

  const errorSelector = (state: RootState) => state.error;
  const isError = useSelector(errorSelector);

  const renderBtnActions = (
    <>
      <MDBBtn color="danger" onClick={() => dispatch(hideError())}>
        Close
      </MDBBtn>
    </>
  );

  const bodyText = (
    <>
      <ul>
        {isError.error.map((err) => (
          <li key={err.message}>{err.message}</li>
        ))}
      </ul>
    </>
  );

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
        <Route path="/" component={Home} />
      </Switch>
      <Modal
        isOpen={isError.isOpen}
        modalStyle="danger"
        bodyText={bodyText}
        modalTitle="Error"
        modalButtons={renderBtnActions}
        toggle={() => {
          dispatch(hideError());
        }}
      />
    </Router>
  );
};

export default App;
