import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { useForm } from 'react-hook-form';
import { FormDataProduct, RequestDataProduct } from './types';
import { hideError } from '../../store/actions/error/actions';
import { RootState } from '../../store';
import Modal from '../Modal';

interface Props {
  defaultValues?: FormDataProduct;
  callback: (product: RequestDataProduct) => void;
}

const ProductForm = ({ defaultValues, callback }: Props) => {
  const errorSelector = (state: RootState) => state.error;
  const isError = useSelector(errorSelector);
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const { register, handleSubmit, errors } = useForm<FormDataProduct>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      setImage(defaultValues.urlImage);
    }
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        }
        resolve('');
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = async (data: FormDataProduct) => {
    let fileBase64 = '';
    let keyimage = '';
    if (data.image && data.image.length > 0) {
      fileBase64 = await getBase64(data.image[0]);
      keyimage = data.image[0].name;
    }

    callback({
      name: data.name,
      description: data.description,
      price: data.price,
      image: fileBase64,
      keyimage,
    });
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="needs-validation FieldError"
        noValidate
      >
        <MDBRow>
          <MDBCol md="4" className="mb-2">
            <label htmlFor="formGroupExampleInput" className="grey-text">
              Name
            </label>

            <input
              name="name"
              type="text"
              id="formGroupExampleInput"
              className="form-control"
              placeholder="Name of the product"
              ref={register({ required: true })}
            />
            {errors.name && <p>Name input is required</p>}
          </MDBCol>
          <MDBCol md="4" className="mb-2">
            <label
              htmlFor="defaultFormRegisterConfirmEx3"
              className="grey-text"
            >
              Description
            </label>

            <input
              type="textarea"
              id="defaultFormRegisterConfirmEx3"
              className="form-control"
              name="description"
              placeholder="Your description of the product"
              ref={register({ required: true })}
            />
            {errors.description && <p>Description input is required</p>}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="4" className="mb-2">
            <label
              htmlFor="defaultFormRegisterConfirmEx3"
              className="grey-text"
            >
              Price
            </label>

            <input
              type="text"
              id="defaultFormRegisterConfirmEx3"
              className="form-control"
              name="price"
              placeholder="00.00"
              ref={register({ required: true })}
            />
            {errors.price && <p>Price input is required</p>}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="4" className="mb-2">
            <label
              htmlFor="defaultFormRegisterPasswordEx4"
              className="grey-text"
            >
              Imagen
            </label>
            <div>
              {image ? (
                <img src={image} alt="product" width="300" height="300" />
              ) : null}
              <div>
                <input
                  type="file"
                  id="defaultFormRegisterPasswordEx4"
                  name="image"
                  ref={register()}
                  onChange={handleChange}
                />
                {errors.image && <p>Image input is required</p>}
              </div>
            </div>
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

export default ProductForm;
