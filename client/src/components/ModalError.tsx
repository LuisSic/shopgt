import React from 'react';
import { RootState } from '../store';
import { MDBBtn } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { hideError } from '../store/actions/error/actions';
import Modal from './Modal';

const ModalError = () => {
  const dispatch = useDispatch();
  const errorSelector = (state: RootState) => state.error;
  const isError = useSelector(errorSelector);
  const renderBtnActions = (
    <>
      <MDBBtn color="danger" onClick={() => dispatch(hideError())}>
        Close
      </MDBBtn>
    </>
  );

  const bodyText = (
    <>
      <ul>
        {isError.error.map((err) => (
          <li key={err.message}>{err.message}</li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      <Modal
        isOpen={isError.isOpen}
        modalStyle="danger"
        bodyText={bodyText}
        modalTitle="Error"
        modalButtons={renderBtnActions}
        toggle={() => {
          dispatch(hideError());
        }}
      />
    </>
  );
};

export default ModalError;
