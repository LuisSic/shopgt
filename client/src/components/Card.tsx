import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';

interface Props {
  cardBtns?: React.ReactNode;
  cardImage?: React.ReactNode;
  cardTitle?: React.ReactNode;
  customText?: React.ReactNode;
}

const Card = ({ cardBtns, cardTitle, cardImage, customText }: Props) => {
  return (
    <MDBCard>
      {cardImage}
      <MDBCardBody>
        <MDBCardTitle tag="h5">{cardTitle}</MDBCardTitle>
        {customText}
        {cardBtns}
      </MDBCardBody>
    </MDBCard>
  );
};

export default Card;
