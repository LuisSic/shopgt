import _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardText,
} from 'mdbreact';
import Modal from '../Modal';
import { RootState } from '../../store';
import { thunkDeleteAddress } from '../../store/actions/address/thunk';
import { Address } from '../../store/actions/address/types';
import Card from '../Card';

const AddressList = () => {
  const addressSelector = (state: RootState) => state.address;
  const address = Object.values(useSelector(addressSelector));
  const dispatch = useDispatch();
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  const [idAddress, setIdAddress] = useState('');

  const openModalDelete = (id: string) => {
    setOpenModalDelete(true);
    setIdAddress(id);
  };

  const removeItem = () => {
    setOpenModalDelete(false);
    dispatch(thunkDeleteAddress(idAddress));
  };

  const cardText = (address: Address) => {
    return (
      <>
        <MDBCardText>{address.address}</MDBCardText>
        <MDBCardText>
          {address.township}
          {`, ${address.country}`}
        </MDBCardText>
        <MDBCardText>{address.deparment}</MDBCardText>
      </>
    );
  };

  const cardBtns = (address: Address) => {
    return (
      <>
        <Link to={`/address/edit/${address.id}`}>
          <MDBBtn color="indigo" size="sm">
            <MDBIcon icon="edit" size="2x" />
          </MDBBtn>
        </Link>
        <MDBBtn
          color="danger"
          onClick={() => openModalDelete(address.id)}
          size="sm"
        >
          <MDBIcon icon="trash-alt" size="2x" />
        </MDBBtn>
      </>
    );
  };

  const renderCard = (listAddress: Address[]) =>
    listAddress.map((address) => {
      return (
        <MDBCol sm="4" key={address.id}>
          <Card
            customText={cardText(address)}
            cardTitle={address.name}
            cardBtns={cardBtns(address)}
          />
        </MDBCol>
      );
    });

  const renderList = () => {
    let tempArrayProducts = _.chunk(address, 3);
    return tempArrayProducts.map((address, index) => {
      return (
        <MDBRow style={{ padding: '25px 25px 25px 25px' }} key={index}>
          {renderCard(address)}
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
      <Link to={`/address/new`}>
        <MDBBtn color="primary">Create Address</MDBBtn>
      </Link>
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

export default AddressList;
