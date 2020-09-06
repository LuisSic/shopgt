import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBBtn,
  MDBCardText,
  MDBIcon,
} from 'mdbreact';
import Card from './Card';
import Modal from '../Modal';
import shopgt from '../../apis/shopgt';
import { ResponseDataProduct } from './types';

import { setError } from '../../store/actions/error/actions';
import history from '../../history';

const ProductList = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  const [idProduct, setIdProduct] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await shopgt.get('/api/product');
        setProducts(response.data);
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
    fetchProducts();
  }, [dispatch]);

  const fetchDeleteProduct = async () => {
    try {
      await shopgt.delete(`/api/product/${idProduct}`);
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

  const openModalDelete = (id: string) => {
    setOpenModalDelete(true);
    setIdProduct(id);
  };

  const removeItem = () => {
    setOpenModalDelete(false);
    fetchDeleteProduct();
  };

  const renderBody = (produc: ResponseDataProduct) => {
    return (
      <>
        <MDBCardTitle tag="h5">{produc.name}</MDBCardTitle>
        <MDBCardText>{produc.description}</MDBCardText>
        <MDBCardText>{`Price ${produc.price}`}</MDBCardText>
        <Link to={`/products/edit/${produc.id}`}>
          <MDBBtn color="primary">Edit</MDBBtn>
        </Link>
        <MDBBtn color="danger" onClick={() => openModalDelete(produc.id)}>
          Delete
        </MDBBtn>
      </>
    );
  };

  const renderCard = (product: ResponseDataProduct[]) =>
    product.map((p) => {
      return (
        <MDBCol sm="4" key={p.id}>
          <Card image={p.imageUrl} children={renderBody(p)} />
        </MDBCol>
      );
    });

  const renderList = () => {
    let tempArrayProducts = _.chunk(products, 3);
    return tempArrayProducts.map((product, index) => {
      return (
        <MDBRow style={{ padding: '25px 25px 25px 25px' }} key={index}>
          {renderCard(product)}
        </MDBRow>
      );
    });
  };

  const deleteModalBody = (
    <>
      <MDBIcon icon="times" size="4x" className="animated rotateIn" />
    </>
  );

  const deleteModalFooter = (
    <>
      <MDBBtn color="danger" onClick={removeItem}>
        Yes
      </MDBBtn>
      <MDBBtn color="danger" outline onClick={() => setOpenModalDelete(false)}>
        No
      </MDBBtn>
    </>
  );

  console.log('ProductList');
  return (
    <MDBContainer>
      {renderList()}

      <Modal
        isOpen={isOpenModalDelete}
        modalStyle={'warning'}
        modalButtons={deleteModalFooter}
        modalTitle="Are you sure?"
        bodyText={deleteModalBody}
        toggle={() => setOpenModalDelete(false)}
      />
    </MDBContainer>
  );
};

export default ProductList;
