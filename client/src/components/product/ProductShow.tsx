import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ResponseDataProduct } from './types';
import Loader from '../Loader';
import { thunkAddItem } from '../../store/actions/shopCart/thunk';
import Select from './Select';
import useRequest from '../../hooks/user-request';

interface ParamTypes {
  id: string;
}

const ProductShow = () => {
  const dispatch = useDispatch();
  const { id } = useParams<ParamTypes>();
  const [quantity, setQuantity] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const { doRequest, resposeData: product } = useRequest<ResponseDataProduct>({
    url: `/api/product/${id}`,
    method: 'get',
  });

  useEffect(() => {
    doRequest();
  }, [doRequest]);

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
          <p>
            <span>{product.description}</span>
          </p>
          <span>{`Precio Q${product.price}`}</span>
          <Select value={quantity.toString()} handleChange={handleChange} />
          <MDBBtn
            active
            color="primary"
            onClick={addItemShopCart}
            style={{ margin: '20px 0px 0px 0px' }}
          >
            Add Shopping-Cart
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ProductShow;
