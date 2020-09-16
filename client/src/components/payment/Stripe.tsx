import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { MDBContainer } from 'mdbreact';
import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51H72TcEUKGOwqkwA1lItHnWuYZmlRx51dw5BZUcP2yLv5EP6xesooTKTJwdleJ9iNkyAcEjdBhPNyNh9uFDpUWWM00sO0AL8lz'
);

const Stripe = () => {
  return (
    <MDBContainer>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </MDBContainer>
  );
};

export default Stripe;
