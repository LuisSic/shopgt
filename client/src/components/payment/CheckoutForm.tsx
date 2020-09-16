import './cardDetail.css';
import '../messageError.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  thunkFetchOrder,
  thunkPayOrder,
} from '../../store/actions/orders/thunk';

interface PaymentFormData {
  firstName: string;
  lastName: string;
  email: string;
}
interface ParamTypes {
  id: string;
}

const CARD_OPTIONS = {
  hidePostalCode: true,
  style: {
    base: {
      iconColor: '#424770',
      color: '#424770',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#424770' },
      '::placeholder': { color: '#424770' },
    },
    invalid: {
      iconColor: '#ff0000',
      color: '#ff0000',
    },
  },
};

const CheckoutForm = () => {
  const [cardError, setCardError] = useState<string>();
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams<ParamTypes>();
  const ordersSelector = (state: RootState) => state.orders[id];
  const order = useSelector(ordersSelector);
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm<PaymentFormData>();

  useEffect(() => {
    dispatch(thunkFetchOrder(id));
  }, [dispatch, id]);

  const onSubmit = async (data: PaymentFormData) => {
    // Block native form submission.

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)!;

    // Use your card Element with other Stripe.js APIs
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      setCardError(error.message);
    } else {
      dispatch(thunkPayOrder(id, token!.object, data.email));
    }
  };

  if (!order) {
    return <h1>Loading</h1>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="FieldError">
      <MDBRow center style={{ padding: '16px 0px 0px 0px ' }}>
        <h3>Shipping &amp; Billing Information</h3>
      </MDBRow>
      <MDBRow center style={{ padding: '16px 0px 0px 0px ' }}>
        <h4>{`No. Order: ${order.id}`}</h4>
      </MDBRow>
      <MDBRow center style={{ padding: '16px 0px 0px 0px ' }}>
        <MDBCol sm="6">
          <label htmlFor="defaultFormRegisterConfirmEx3">E-mail Adddress</label>

          <input
            type="email"
            id="defaultFormRegisterConfirmEx3"
            className="form-control"
            name="email"
            placeholder="E-mail address"
            ref={register({ required: true })}
          />
          {errors.email && <p>E-mail address input is required</p>}
        </MDBCol>
      </MDBRow>
      <MDBRow center style={{ padding: '16px 0px 0px 0px ' }}>
        <MDBCol sm="6">
          <label htmlFor="personalDetails">Personal Details</label>
        </MDBCol>
      </MDBRow>
      <MDBRow center>
        <MDBCol sm="3">
          <input
            type="text"
            id="defaultFormRegisterConfirmEx3"
            className="form-control"
            name="firstName"
            placeholder="First Name"
            ref={register({ required: true })}
          />
          {errors.firstName && <p>First Name input is required</p>}
        </MDBCol>
        <MDBCol sm="3">
          <input
            type="text"
            id="defaultFormRegisterConfirmEx3"
            className="form-control"
            name="lastName"
            placeholder="Last Name"
            ref={register({ required: true })}
          />
          {errors.lastName && <p>Last Name input is required</p>}
        </MDBCol>
      </MDBRow>
      <MDBRow center style={{ padding: '16px 0px 0px 0px' }}>
        <MDBCol md="6">
          <label htmlFor="defaultFormRegisterConfirmEx3">
            Credit or debit card
          </label>
          <CardElement options={CARD_OPTIONS} />
          {cardError && <p>{cardError}</p>}
          <div
            className=" d-flex justify-content-center"
            style={{ margin: '40px 0px 0px 0px' }}
          >
            <MDBBtn
              active
              color="primary"
              disabled={!stripe}
              className="w-50"
              type="submit"
            >
              Pay {`Q ${order.total}`}
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
      <MDBRow></MDBRow>
    </form>
  );
};

export default CheckoutForm;
