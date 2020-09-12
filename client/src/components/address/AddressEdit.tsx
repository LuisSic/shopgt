import '../messageError.css';
import React, { useState, useEffect } from 'react';
import { MDBRow, MDBContainer, MDBBtn, MDBIcon } from 'mdbreact';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AddressFormData } from './types';
import { thunkEditAddress } from '../../store/actions/address/thunk';
import { thunkFetchAddress } from '../../store/actions/address/thunk';
import AddressForm from './AddressForm';
import Maps from './Maps';
import Loader from '../Loader';

interface Position {
  lat: number;
  lng: number;
}

interface ParamTypes {
  id: string;
}

const AddressEdit = () => {
  const { id } = useParams<ParamTypes>();
  const addressSelector = (state: RootState) => state.address[id];
  const address = useSelector(addressSelector);
  const dispatch = useDispatch();
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    dispatch(thunkFetchAddress(id));
  }, [dispatch, id]);

  const onSubmit = (data: AddressFormData) => {
    dispatch(
      thunkEditAddress(
        {
          name: data.name,
          address: data.address,
          country: data.country,
          township: data.township,
          deparment: data.deparment,
          position: {
            lat: position?.lat.toString() || '',
            long: position?.lng.toString() || '',
          },
        },
        id
      )
    );
  };
  const callback = async (userPosition: Position) => {
    setPosition(userPosition);
  };

  const location = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.log(err.message);
      }
    );
  };

  if (!address) {
    return <Loader />;
  }

  return (
    <MDBContainer>
      <h3>Edit Address</h3>
      <AddressForm defaultValues={address} callback={onSubmit} />
      <MDBRow style={{ padding: '25px' }} center={true}>
        <Maps
          position={{
            lat: parseFloat(address.position.lat),
            lng: parseFloat(address.position.long),
          }}
          setPosition={callback}
        />
      </MDBRow>
      <MDBRow center={true}>
        <MDBBtn outline color="primary" onClick={location}>
          <MDBIcon icon="map-marked-alt" />
          Locate me
        </MDBBtn>
      </MDBRow>
    </MDBContainer>
  );
};

export default AddressEdit;
