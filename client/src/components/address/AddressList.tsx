import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardText,
  MDBIcon,
  MDBCard,
  MDBCardBody,
} from 'mdbreact';
import Modal from '../Modal';
import { RootState } from '../../store';
import { hideError } from '../../store/actions/error/actions';
import {
  thunkFetchAddresses,
  thunkDeleteAddress,
} from '../../store/actions/address/thunk';
import { AddressState } from '../../store/actions/address/types';

const AddressList = () => {
  const errorSelector = (state: RootState) => state.error;
  const addressSelector = (state: RootState) => state.address;
  const address = Object.values(useSelector(addressSelector));
  const isError = useSelector(errorSelector);
  const dispatch = useDispatch();
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  const [idAddress, setIdAddress] = useState('');

  useEffect(() => {
    dispatch(thunkFetchAddresses());
  }, [dispatch]);

  const openModalDelete = (id: string) => {
    setOpenModalDelete(true);
    setIdAddress(id);
  };

  const removeItem = () => {
    setOpenModalDelete(false);
    dispatch(thunkDeleteAddress(idAddress));
  };

  const renderBody = (address: AddressState) => {
    return (
      <>
        <MDBCard style={{ width: '22rem' }}>
          <MDBCardBody>
            <MDBCardText>{address.country}</MDBCardText>
            <MDBCardText>{address.deparment}</MDBCardText>
            <MDBCardText>{address.township}</MDBCardText>
            <MDBCardText>{address.address}</MDBCardText>
            <Link to={`/products/edit/${address.id}`}>
              <MDBBtn color="primary">Edit</MDBBtn>
            </Link>
            <MDBBtn color="danger" onClick={() => openModalDelete(address.id)}>
              Delete
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </>
    );
  };

  const renderCard = (listAddress: AddressState[]) =>
    listAddress.map((address) => {
      return (
        <MDBCol sm="4" key={address.id}>
          {renderBody(address)}
        </MDBCol>
      );
    });

  const renderList = () => {
    //const listAddress = Object.keys(address);

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

  const errorModalFooter = (
    <>
      <MDBBtn color="danger" onClick={() => dispatch(hideError())}>
        Close
      </MDBBtn>
    </>
  );
  console.log(address);
  return (
    <MDBContainer>
      <Link to={`/addresses/new`}>
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
      <Modal
        isOpen={isError.isOpen}
        modalStyle={'danger'}
        modalButtons={errorModalFooter}
        modalTitle={'Error'}
        bodyText={isError.error}
        toggle={() => dispatch(hideError())}
      />
    </MDBContainer>
  );
};

export default AddressList;
