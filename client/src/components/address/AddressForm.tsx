import React from 'react';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { hideError } from '../../store/actions/error/actions';
import { RootState } from '../../store';
import { AddressFormData } from './types';
import Modal from '../Modal';

interface Props {
  defaultValues?: AddressFormData;
  callback: (data: AddressFormData) => void;
}

const AddressForm = ({ defaultValues, callback }: Props) => {
  const { register, errors, handleSubmit } = useForm<AddressFormData>({
    defaultValues: defaultValues,
  });

  const errorSelector = (state: RootState) => state.error;
  const isError = useSelector(errorSelector);
  const dispatch = useDispatch();

  const onSubmit = async (data: AddressFormData) => {
    callback(data);
  };

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
      <form onSubmit={handleSubmit(onSubmit)} className="FieldError">
        <MDBRow>
          <MDBCol>
            <label
              htmlFor="defaultFormRegisterConfirmEx3"
              className="grey-text"
            >
              Country
            </label>

            <input
              type="text"
              id="defaultFormRegisterConfirmEx3"
              className="form-control"
              name="country"
              placeholder="Your Country"
              ref={register({ required: true })}
            />
            {errors.country && <p>Country input is required</p>}
          </MDBCol>
          <MDBCol>
            <label
              htmlFor="defaultFormRegisterConfirmEx3"
              className="grey-text"
            >
              Deparment
            </label>

            <input
              type="text"
              id="defaultFormRegisterConfirmEx3"
              className="form-control"
              name="deparment"
              placeholder="Your deparment"
              ref={register({ required: true })}
            />
            {errors.deparment && <p>Deparment input is required</p>}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <label
              htmlFor="defaultFormRegisterConfirmEx3"
              className="grey-text"
            >
              TownShip
            </label>

            <input
              type="text"
              id="defaultFormRegisterConfirmEx3"
              className="form-control"
              name="township"
              placeholder="Your township"
              ref={register({ required: true })}
            />
            {errors.township && <p>TownShip input is required</p>}
          </MDBCol>
          <MDBCol>
            <label
              htmlFor="defaultFormRegisterConfirmEx3"
              className="grey-text"
            >
              Address
            </label>

            <input
              type="text"
              id="defaultFormRegisterConfirmEx3"
              className="form-control"
              name="address"
              placeholder="Your address"
              ref={register({ required: true })}
            />
            {errors.address && <p>Address input is required</p>}
          </MDBCol>
        </MDBRow>
        <MDBBtn color="primary" type="submit">
          Submit Form
        </MDBBtn>
      </form>
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

export default AddressForm;
