import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ResponseDataProduct } from './types';
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

  return (
    <MDBContainer>
      {product && (
        <>
          <MDBRow style={{ padding: '50px ' }}>
            <MDBCol>
              <img src={product.imageUrl} alt={product.keyimage} />
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
        </>
      )}
    </MDBContainer>
  );
};

export default ProductShow;
