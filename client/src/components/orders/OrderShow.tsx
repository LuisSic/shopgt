import React, { useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCardText } from 'mdbreact';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { thunkFetchOrder } from '../../store/actions/orders/thunk';

import Card from '../Card';

interface ParamTypes {
  id: string;
}

const OrderShow = () => {
  const { id } = useParams<ParamTypes>();
  const orderSelector = (state: RootState) => state.orders[id];
  const order = useSelector(orderSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkFetchOrder(id));
  }, [dispatch, id]);

  if (!order) {
    return <div>Loading</div>;
  }

  const renderItems = order.shopCart.map((item) => {
    return (
      <li className="media " key={item.product.id}>
        <img
          className="d-flex mr-3"
          src={item.product.imageUrl}
          alt={item.product.keyimage}
          style={{ width: '150px' }}
        />
        <div className="media-body">
          <h5 className="mt-0 mb-1 font-weight-bold">{item.product.name}</h5>
          <p>{`Price Q ${item.product.price}`}</p>
          <p>{`Quantity: ${item.quantity}`}</p>
          <p>{`SubTotal: ${item.quantity * item.product.price}`}</p>
        </div>
      </li>
    );
  });

  const cardText = (
    address: string,
    deparment: string,
    country: string,
    township: string
  ) => {
    return (
      <>
        <MDBCardText>{address}</MDBCardText>
        <MDBCardText>
          {township}
          {`, ${country}`}
        </MDBCardText>
        <MDBCardText>{deparment}</MDBCardText>
      </>
    );
  };
  return (
    <MDBContainer>
      <h2>Order Detail</h2>
      <MDBRow style={{ padding: '25px 0px 25px 0px' }}>
        <MDBCol>
          <ul className="list-unstyled ">{renderItems}</ul>
        </MDBCol>
        <MDBCol>
          <Card
            cardTitle={order.homeAddress.name}
            customText={cardText(
              order.homeAddress.address,
              order.homeAddress.deparment,
              order.homeAddress.country,
              order.homeAddress.township
            )}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="block-example border border-bottom-0 border-right-0 border-left-0 border-primary">
        <MDBCol md="4">
          <label> {`Total Q ${order.total}`}</label>
        </MDBCol>
        <MDBCol md="4">
          <label> {`Date: ${order.dateOrder}`}</label>
        </MDBCol>
        <MDBCol md="4">
          <label> {`Status: ${order.status}`}</label>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default OrderShow;
