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
          alt="MDBCard image cap"
          top
          overlay="white-slight"
          src={image}
          cascade
        />
      </MDBView>
      <MDBCardBody>{children}</MDBCardBody>
    </MDBCard>
  );
};

export default Card;
