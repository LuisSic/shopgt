import React from 'react';
import { MDBContainer } from 'mdbreact';
import { RequestDataProduct, ResponseDataProduct } from './types';
import useRequest from '../../hooks/user-request';
import ProductForm from './ProductForm';
import history from '../../history';

const ProductCreate = () => {
  const onSuccess = () => history.push('/');
  const { doRequest } = useRequest<ResponseDataProduct>(
    {
      url: '/api/product',
      method: 'post',
    },
    onSuccess
  );

  const onSubmit = async (product: RequestDataProduct) => {
    await doRequest(product);
  };

  return (
    <>
      <MDBContainer>
        <h3>Create a Product</h3>
        <ProductForm callback={onSubmit} />
      </MDBContainer>
    </>
  );
};

export default ProductCreate;
