import React from 'react';
import ProductForm from './ProductForm';

const ProductCreate = () => {
  const onSubmit = () => {
    console.log('Create Product');
  };

  return <ProductForm callback={onSubmit} />;
};

export default ProductCreate;
