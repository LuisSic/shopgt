import './ShopCartList.css';
import React, { useEffect } from 'react';
import {
  MDBDataTable,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBBtn,
  MDBRow,
} from 'mdbreact';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  thunkDeleteItem,
  thunkFecthCart,
} from '../../store/actions/shopCart/thunk';
import { selectedAddress } from '../../store/actions/shopCart/actions';
const columns = [
  {
    label: 'Product',
    field: 'Product',
    width: 150,
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

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(selectedAddress(e.target.value));
  };
  const addressList = Object.values(addressBook).map((address) => {
    return (
      <label key={address.id}>
        <input
          type="radio"
          value={address.id}
          checked={shopCart.addressId === address.id}
          onChange={onValueChange}
          key={address.id}
        />
        {' ' + address.name}
      </label>
    );
  });

  const handleOnclickOrder = () => {
    console.log('hola');
  };

  return (
    <MDBContainer>
      <h2>Shopping-Cart</h2>
      <MDBRow>
        <MDBCol size="9">
          <MDBDataTable
            hover
            data={{ columns, rows }}
            searching={false}
            displayEntries={false}
            paging={false}
          />
        </MDBCol>
        <MDBCol size="3">
          <p>
            <span>Total: Q {total}</span>
          </p>
          <p>
            <span>Select Address</span>
          </p>
          <div>{addressList}</div>
          {total > 0 && (
            <MDBBtn onClick={handleOnclickOrder}>Make Order</MDBBtn>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ShopCartList;
