import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import shopgt from '../../apis/shopgt';
import { ResponseDataProduct } from './types';
import { setError } from '../../store/actions/error/actions';
import Loader from '../Loader';
import { thunkAddItem } from '../../store/actions/shopCart/thunk';
import Select from './Select';

interface ParamTypes {
  id: string;
}

const ProductShow = () => {
  const dispatch = useDispatch();
  const { id } = useParams<ParamTypes>();
  const [product, setProduct] = useState<ResponseDataProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await shopgt.get<ResponseDataProduct>(
          `/api/product/${id}`
        );
        setProduct(response.data);
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
    fetchProduct();
  }, [dispatch, id]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const addItemShopCart = () => {
    dispatch(
      thunkAddItem({
        productId: id,
        quantity,
      })
    );
  };

  if (!product) {
    return <Loader />;
  }

  return (
    <MDBContainer>
      <MDBRow style={{ padding: '50px ' }}>
        <MDBCol>
          {!loaded && <Loader />}
          <img
            src={product.imageUrl}
            alt={product.keyimage}
            style={loaded ? {} : { display: 'none' }}
            onLoad={() => setLoaded(true)}
          />
        </MDBCol>
        <MDBCol>
          <h3>{product.name}</h3>
          <span>{product.description}</span>
          <span>Q.{product.price}</span>
          <Select value={quantity.toString()} handleChange={handleChange} />
          <MDBBtn color="primary" onClick={addItemShopCart}>
            Add Shopping-Cart
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ProductShow;
