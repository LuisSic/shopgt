import React from 'react';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { useForm } from 'react-hook-form';
import { AddressFormData } from './types';

interface Props {
  defaultValues?: AddressFormData;
  callback: (data: AddressFormData) => void;
}

const AddressForm = ({ defaultValues, callback }: Props) => {
  const { register, errors, handleSubmit } = useForm<AddressFormData>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: AddressFormData) => {
    callback(data);
  };

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
    </>
  );
};

export default AddressForm;
