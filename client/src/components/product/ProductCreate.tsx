import React from 'react';
import { useDispatch } from 'react-redux';
import { MDBContainer } from 'mdbreact';
import ProductForm from './ProductForm';
import shopgt from '../../apis/shopgt';
import { setError } from '../../store/actions/error/actions';
import history from '../../history';
import { RequestDataProduct } from './types';

const ProductCreate = () => {
  const dispatch = useDispatch();
  const onSubmit = async (product: RequestDataProduct) => {
    try {
      await shopgt.post('/api/product', product);
      history.push('/');
    } catch (err) {
      if (err && err.response) {
        dispatch(
          setError({
            error: err.response.data.errors,
            isOpen: true,
          })
        );
      }
    }
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
