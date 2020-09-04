import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const ProductShow = () => {
  return (
    <MDBContainer>
      <MDBRow style={{ padding: '50px ' }}>
        <MDBCol>
          <img
            src={
              'https://sluismicroservices.s3.us-east-2.amazonaws.com/a4674-rye0f.jpg.jpeg'
            }
            alt="product"
          />
        </MDBCol>
        <MDBCol>
          <h3>Xbox one 3</h3>
          <p>Esto es una descripcion del producto</p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ProductShow;
