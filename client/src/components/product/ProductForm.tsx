import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBBtn, MDBIcon, MDBContainer } from 'mdbreact';
import { useForm } from 'react-hook-form';

interface FormDataProduct {
  name: string;
  description: string;
  price: number;
  image?: Array<File>;
  nameImage: string;
  urlImage: string;
}

interface Props {
  defaultValues?: FormDataProduct;
  callback: () => void;
}

const ProductForm = (props: Props) => {
  const [image, setImage] = useState('');
  const { register, handleSubmit } = useForm<FormDataProduct>({
    defaultValues: props.defaultValues,
  });

  useEffect(() => {
    if (props.defaultValues) {
      setImage(props.defaultValues.urlImage);
    }
  }, [props.defaultValues]);

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
    const fileBase64 = await getBase64(data.image![0]);
    console.log(fileBase64);
    props.callback();
  };
  return (
    <MDBContainer>
      <h2>Create a Product</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="needs-validation"
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
              ref={register()}
            />
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
              ref={register()}
            />
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
              ref={register()}
            />
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
                <img src={image} alt="dummy" width="300" height="300" />
              ) : (
                <MDBIcon icon="file-image" />
              )}
            </div>

            <div>
              <input
                type="file"
                id="defaultFormRegisterPasswordEx4"
                name="image"
                ref={register()}
                onChange={handleChange}
              />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBBtn color="primary" type="submit">
          Submit Form
        </MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default ProductForm;
