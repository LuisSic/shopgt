import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { thunkSignOut } from '../store/actions/user/thunk';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from 'mdbreact';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { thunkFetchAddresses } from '../store/actions/address/thunk';

const handleSignInFacebook = () => {
  // Authenticate using via passport api in the backend
  // Open Facebook login page
  window.open('http://localhost:80/api/users/facebook', '_self');
};

const handleSignInGoogle = () => {
  // Authenticate using via passport api in the backend
  // Open Google login page
  window.open('http://localhost:80/api/users/google', '_self');
};

const renderBtnLogin = (
  <>
    <FacebookLoginButton onClick={handleSignInFacebook}>
      <span>Facebook</span>
    </FacebookLoginButton>
    <GoogleLoginButton onClick={handleSignInGoogle}>
      <span>Google</span>
    </GoogleLoginButton>
  </>
);

const modalFooter = (
  <>
    <strong className="black-text">ShopGT</strong>
  </>
);

const Header = () => {
  const selectAuth = (state: RootState) => state.auth;
  const selectShopCart = (state: RootState) => state.shoppingCart;
  const shopCart = useSelector(selectShopCart);
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const [collapseID, setCollapseID] = useState('');
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (auth.isSignedIn) {
      dispatch(thunkFetchAddresses());
    }
  }, [auth.isSignedIn, dispatch]);

  const toggleCollapse = (newCollapseID: string) => {
    setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');
  };

  const handleLogOutClick = () => {
    dispatch(thunkSignOut());
  };

  return (
    <MDBNavbar color="indigo" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">ShopGT</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler
        onClick={() => {
          toggleCollapse('navbarCollapse3');
        }}
      />
      <MDBCollapse id="navbarCollapse3" isOpen={collapseID} navbar>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink to="/">Home</MDBNavLink>
          </MDBNavItem>

          {auth.isSignedIn ? (
            <>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">Products</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" right>
                    <MDBDropdownItem>
                      <Link to="/products/new">Create</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link to="/products/list">Product Book</Link>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/order/list">Order History</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/address/list">Address Book</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  className="waves-effect waves-light d-flex align-items-center"
                  to="/shopcart"
                >
                  {Object.keys(shopCart.items).length}
                  <MDBIcon icon="shopping-cart" className="ml-1" />
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle className="dopdown-toggle" nav>
                    <img
                      src={auth.photo}
                      className="rounded-circle z-depth-0"
                      style={{ height: '35px', padding: 0 }}
                      alt=""
                    />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" right>
                    <MDBDropdownItem onClick={handleLogOutClick}>
                      Log out
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavbarBrand>
                  <span>{auth.name}</span>
                </MDBNavbarBrand>
              </MDBNavItem>
            </>
          ) : (
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle
                  className="dopdown-toggle"
                  nav
                  onClick={() => setLogin(true)}
                >
                  Login
                </MDBDropdownToggle>
              </MDBDropdown>
            </MDBNavItem>
          )}
        </MDBNavbarNav>
      </MDBCollapse>
      <Modal
        isOpen={login}
        modalStyle={'info'}
        bodyText={renderBtnLogin}
        modalTitle={'Sign In'}
        modalButtons={modalFooter}
        toggle={() => setLogin(false)}
      />
    </MDBNavbar>
  );
};

export default Header;
