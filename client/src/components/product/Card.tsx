import React from 'react';
import { MDBCard, MDBCardImage, MDBCardBody, MDBView } from 'mdbreact';

interface Props {
  children: React.ReactNode;
  image: string;
}

const Card = ({ children, image }: Props) => {
  return (
    <MDBCard>
      <MDBView hover zoom>
        <MDBCardImage
          src={image}
          alt="MDBCard image cap"
          top
          overlay="white-slight"
        />
      </MDBView>
      <MDBCardBody>{children}</MDBCardBody>
    </MDBCard>
  );
};

export default Card;
