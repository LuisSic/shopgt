import _ from 'lodash';
import React, { useEffect, useState } from 'react';
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
import { ResponseDataProduct } from './types';

import history from '../../history';
import useRequest from '../../hooks/user-request';

const ProductList = () => {
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  const [idProduct, setIdProduct] = useState('');

  const { doRequest: doRequestGet, resposeData: data } = useRequest<
    ResponseDataProduct[]
  >({
    url: '/api/product',
    method: 'get',
  });
  const onSuccess = () => history.push('/');
  const { doRequest: doRequestDelete } = useRequest<ResponseDataProduct[]>(
    {
      url: `/api/product/${idProduct}`,
      method: 'delete',
    },
    onSuccess
  );

  useEffect(() => {
    doRequestGet();
  }, [doRequestGet]);

  const fetchDeleteProduct = async () => {
    doRequestDelete();
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
    let tempArrayProducts = _.chunk(data, 3);
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

  return (
    <MDBContainer>
      {renderList()}

      <Modal
        isOpen={isOpenModalDelete}
        modalStyle={'danger'}
        modalButtons={deleteModalFooter}
        modalTitle="Are you sure?"
        bodyText={deleteModalBody}
        toggle={() => setOpenModalDelete(false)}
      />
    </MDBContainer>
  );
};

export default ProductList;
