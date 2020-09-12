import React from 'react';
import {
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';

interface Props {
  isOpen: boolean;
  modalStyle: 'success' | 'info' | 'danger' | 'warning';
  bodyText: React.ReactNode;
  modalButtons?: React.ReactNode;
  modalTitle: string;
  toggle: () => void;
}

const Modal = ({
  isOpen,
  modalStyle,
  bodyText,
  modalButtons,
  modalTitle,
  toggle,
}: Props) => {
  return (
    <MDBModal
      isOpen={isOpen}
      toggle={toggle}
      centered
      inline={false}
      overflowScroll={false}
      noClickableBodyWithoutBackdrop={true}
      modalStyle={modalStyle}
      size="sm"
    >
      <MDBModalHeader
        className="text-center"
        titleClass="w-100"
        tag="p"
        toggle={toggle}
      >
        {modalTitle}
      </MDBModalHeader>
      <MDBModalBody className="text-center">{bodyText}</MDBModalBody>
      <MDBModalFooter className="justify-content-center">
        {modalButtons}
      </MDBModalFooter>
    </MDBModal>
  );
};

export default Modal;
