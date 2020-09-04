import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { thunkSignOut } from '../store/actions/user/thunk';
import { Link } from 'react-router-dom';
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
  MDBBtn,
} from 'mdbreact';

const Header = () => {
  const selectAuth = (state: RootState) => state.auth;
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const [collapseID, setCollapseID] = useState('');

  const toggleCollapse = (newCollapseID: string) => {
    setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');
  };

  const handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Facebook login page
    window.open('http://localhost:80/api/users/facebook', '_self');
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
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline">Products</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default" right>
                <MDBDropdownItem>
                  <Link to="/products/new">Create</Link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <Link to="/products/list">List Products</Link>
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

          {auth.isSignedIn ? (
            <>
              <MDBNavItem active>
                <MDBNavLink to="#!">My Orders</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem active>
                <Link to="/addresses/list">List Products</Link>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  className="waves-effect waves-light d-flex align-items-center"
                  to="#!"
                >
                  1
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
                    <MDBDropdownItem header>Hello! {auth.name}</MDBDropdownItem>
                    <MDBDropdownItem>Addresses</MDBDropdownItem>
                    <MDBDropdownItem>Orders</MDBDropdownItem>
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
                <MDBDropdownToggle className="dopdown-toggle" nav>
                  Login
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right>
                  <MDBBtn
                    color="primary"
                    size="lg"
                    style={{ width: '93%' }}
                    onClick={handleSignInClick}
                  >
                    Facebook
                  </MDBBtn>
                  <MDBBtn color="danger" size="lg" style={{ width: '93%' }}>
                    Google
                  </MDBBtn>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          )}
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default Header;
