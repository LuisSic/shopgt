import React from 'react';
import { MDBContainer } from 'mdbreact';
import ProductForm from './ProductForm';
import history from '../../history';
import { RequestDataProduct } from './types';
import useRequest from '../../hooks/user-request';
import { ResponseDataProduct } from './types';

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
