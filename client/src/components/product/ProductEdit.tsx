import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MDBContainer } from 'mdbreact';
import { setError } from '../../store/actions/error/actions';
import shopgt from '../../apis/shopgt';
import history from '../../history';
import ProductForm from './ProductForm';
import { ResponseDataProduct, RequestDataProduct } from './types';

interface ParamTypes {
  id: string;
}
const ProductEdit = () => {
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<ResponseDataProduct | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await shopgt.get(`/api/product/${id}`);
      setProduct(response.data);
    };
    fetchProducts();
  }, [id]);

  const onSubmit = async (product: RequestDataProduct) => {
    try {
      await shopgt.put(`/api/product/${id}`, product);
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
    <div>Loading</div>
  );
};

export default ProductEdit;
