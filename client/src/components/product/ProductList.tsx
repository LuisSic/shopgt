import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBView,
  MDBCardImage,
  MDBCardText,
} from 'mdbreact';
import Card from '../Card';
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

  const openModalDelete = (id: string) => {
    setOpenModalDelete(true);
    setIdProduct(id);
  };

  const removeItem = () => {
    setOpenModalDelete(false);
    doRequestDelete();
  };

  const renderBody = (produc: ResponseDataProduct) => {
    return (
      <>
        <MDBCardText>{produc.description}</MDBCardText>
        <MDBCardText>{`Price Q ${produc.price}`}</MDBCardText>
      </>
    );
  };

  const cardBtns = (producId: string) => (
    <>
      <Link to={`/products/edit/${producId}`}>
        <MDBBtn color="indigo" size="sm">
          <MDBIcon icon="edit" size="2x" />
        </MDBBtn>
      </Link>
      <MDBBtn
        color="danger"
        onClick={() => openModalDelete(producId)}
        size="sm"
      >
        <MDBIcon icon="trash-alt" size="2x" />
      </MDBBtn>
    </>
  );

  const cardImage = (srcImg: string) => (
    <MDBView hover zoom>
      <MDBCardImage
        alt="MDBCard image cap"
        top
        overlay="white-slight"
        src={srcImg}
        cascade
      />
    </MDBView>
  );

  const renderCard = (product: ResponseDataProduct[]) =>
    product.map((p) => {
      return (
        <MDBCol sm="4" key={p.id}>
          <Card
            cardImage={cardImage(p.imageUrl)}
            cardTitle={p.name}
            customText={renderBody(p)}
            cardBtns={cardBtns(p.id)}
          />
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
