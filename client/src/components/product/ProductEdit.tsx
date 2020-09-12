import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MDBContainer } from 'mdbreact';
import history from '../../history';
import ProductForm from './ProductForm';
import { ResponseDataProduct, RequestDataProduct } from './types';
import Loader from '../Loader';
import useRequest from '../../hooks/user-request';
interface ParamTypes {
  id: string;
}
const ProductEdit = () => {
  const { id } = useParams<ParamTypes>();

  const { doRequest: doRequestGet, resposeData: product } = useRequest<
    ResponseDataProduct
  >({
    url: `/api/product/${id}`,
    method: 'get',
  });

  const onSuccess = () => history.push('/');
  const { doRequest: doRequestPut } = useRequest<ResponseDataProduct>(
    {
      url: `/api/product/${id}`,
      method: 'put',
    },
    onSuccess
  );

  useEffect(() => {
    doRequestGet();
  }, [doRequestGet]);

  const onSubmit = async (product: RequestDataProduct) => {
    doRequestPut(product);
  };

  return product ? (
    <MDBContainer>
      <h3>Edit a Product</h3>
      <ProductForm
        callback={onSubmit}
        defaultValues={{
          name: product.name,
          description: product.description,
          price: product.price,
          urlImage: product.imageUrl,
          nameImage: product.keyimage,
        }}
      />
    </MDBContainer>
  ) : (
    <Loader />
  );
};

export default ProductEdit;
