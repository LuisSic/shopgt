import './ShopCartList.css';
import React, { useEffect } from 'react';
import {
  MDBDataTable,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBBtn,
  MDBRow,
  MDBDropdownItem,
  MDBCardText,
} from 'mdbreact';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  thunkDeleteItem,
  thunkFecthCart,
} from '../../store/actions/shopCart/thunk';
import { thunkCreateOrder } from '../../store/actions/orders/thunk';
import { selectedAddress } from '../../store/actions/shopCart/actions';
import Dropdown from './Dropdown';
import history from '../../history';
import Card from '../Card';
import { Address } from '../../store/actions/address/types';
const columns = [
  {
    label: 'Product',
    field: 'Product',
    width: 100,
    sort: 'disabled',
    attributes: {
      'aria-controls': 'DataTable',
      'aria-label': 'Product',
    },
  },
  {
    label: 'Quantity',
    field: 'Quantity',
    sort: 'disabled',
    width: 270,
  },
  {
    label: 'Price',
    field: 'Price',
    sort: 'disabled',
    width: 200,
  },
  {
    label: 'SubTotal',
    field: 'SubTotal',
    sort: 'disabled',
    width: 100,
  },
  {
    field: 'Delete',
    sort: 'disabled',
    width: 150,
  },
];
const ShopCartList = () => {
  const shopCartSelector = (state: RootState) => state.shoppingCart;
  const addressSelector = (state: RootState) => state.address;
  const shopCart = useSelector(shopCartSelector);
  const addressBook = useSelector(addressSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkFecthCart());
  }, [dispatch]);

  const handleOnclick = (productId: string) => {
    dispatch(thunkDeleteItem(productId));
  };
  const rows = Object.values(shopCart.items).map((key) => ({
    Product: (
      <img
        src={key.product.imageUrl}
        alt={key.product.keyimage}
        style={{ width: '150px' }}
      />
    ),
    Quantity: key.quantity,
    Price: key.product.price,
    SubTotal: key.quantity * key.product.price,
    Delete: (
      <MDBIcon
        far
        icon="trash-alt"
        style={{ cursor: 'pointer' }}
        className="red-text"
        size="lg"
        onClick={() => handleOnclick(key.product.id)}
      />
    ),
  }));

  const total = rows.reduce((a, b) => a + b.SubTotal, 0);

  const addressDropdownItem = (): JSX.Element[] => {
    let renderAddress = Object.values(addressBook).map((address) => {
      return (
        <MDBDropdownItem
          onClick={() => dispatch(selectedAddress(address.id))}
          key={address.id}
        >
          {address.name}
        </MDBDropdownItem>
      );
    });

    renderAddress.push(<MDBDropdownItem divider key="0" />);
    renderAddress.push(
      <MDBDropdownItem onClick={() => history.push('/address/new')} key="1">
        Create Address
      </MDBDropdownItem>
    );

    return renderAddress;
  };

  const handleOnclickOrder = () => {
    dispatch(
      thunkCreateOrder({
        total,
        addressId: shopCart.addressId,
        shopCartId: shopCart.id,
        shopCart: Object.values(shopCart.items),
        date: new Date().toISOString(),
      })
    );
  };

  const cardText = (address: Address) => {
    return (
      <>
        <MDBCardText>{address.address}</MDBCardText>
        <MDBCardText>
          {address.township}
          {`, ${address.country}`}
        </MDBCardText>
        <MDBCardText>{address.deparment}</MDBCardText>
      </>
    );
  };

  return (
    <MDBContainer>
      <h2>Shopping-Cart</h2>
      <MDBRow>
        <MDBCol size="8">
          <MDBDataTable
            hover
            data={{ columns, rows }}
            searching={false}
            displayEntries={false}
            paging={false}
          />
        </MDBCol>
        <MDBCol size="4">
          <span>Total: Q {total}</span>

          <Dropdown
            children={addressDropdownItem()}
            ropdownToggle="Select your Address"
          ></Dropdown>

          {shopCart.addressId && (
            <Card
              customText={cardText(addressBook[shopCart.addressId])}
              cardTitle={addressBook[shopCart.addressId].name}
            />
          )}

          {total > 0 && (
            <MDBBtn
              color="primary"
              onClick={handleOnclickOrder}
              style={{ margin: '20px 0px 0px 0px' }}
            >
              Make Order
            </MDBBtn>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ShopCartList;
