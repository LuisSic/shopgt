import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBDataTable, MDBContainer, MDBIcon } from 'mdbreact';
import { thunkFetchOrders } from '../../store/actions/orders/thunk';
import { RootState } from '../../store';
import history from '../../history';

const columns = [
  {
    label: 'No. Order',
    field: 'Order',
    width: 150,
    sort: 'disabled',
    attributes: {
      'aria-controls': 'DataTable',
      'aria-label': 'Product',
    },
  },
  {
    label: 'Date',
    field: 'Date',
    sort: 'disabled',
    width: 270,
  },
  {
    label: 'State',
    field: 'State',
    sort: 'disabled',
    width: 200,
  },
  {
    label: 'Total Q.',
    field: 'Total',
    sort: 'disabled',
    width: 100,
  },
  {
    field: 'Cancel',
    sort: 'disabled',
    width: 150,
  },
  {
    field: 'Pay',
    sort: 'disabled',
    width: 150,
  },
];
const OrderHistory = () => {
  const ordersSelector = (state: RootState) => state.orders;
  const orders = useSelector(ordersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkFetchOrders());
  }, [dispatch]);

  const rows = Object.values(orders).map((order) => ({
    Order: order.id,
    Date: new Date(order.dateOrder).toString(),
    State: order.status,
    Total: order.total,
    Cancel: (
      <MDBIcon
        far
        icon="trash-alt"
        style={{ cursor: 'pointer' }}
        className="red-text"
        size="lg"
        onClick={() => console.log('hola')}
      />
    ),
    Pay: (
      <MDBIcon
        far
        icon="credit-card"
        style={{ cursor: 'pointer' }}
        className="indigo-text"
        size="lg"
        onClick={() => history.push(`/payment/${order.id}`)}
      />
    ),
  }));

  return (
    <MDBContainer>
      <h2>Order History</h2>
      <MDBDataTable
        hover
        data={{ columns, rows }}
        searching={false}
        displayEntries={false}
        paging={false}
      />
    </MDBContainer>
  );
};

export default OrderHistory;
