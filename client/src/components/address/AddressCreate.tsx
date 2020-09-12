import '../messageError.css';
import React, { useState } from 'react';
import { MDBRow, MDBContainer, MDBBtn, MDBIcon } from 'mdbreact';
import { useDispatch } from 'react-redux';
import { thunkCreateAddress } from '../../store/actions/address/thunk';
import { AddressFormData } from './types';
import AddressForm from './AddressForm';
import Maps from './Maps';

interface Position {
  lat: number;
  lng: number;
}

const Address = () => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState<Position | null>(null);

  const onSubmit = (data: AddressFormData) => {
    dispatch(
      thunkCreateAddress({
        name: data.name,
        address: data.address,
        country: data.country,
        township: data.township,
        deparment: data.deparment,
        position: {
          lat: position?.lat.toString() || '',
          long: position?.lng.toString() || '',
        },
      })
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

  return (
    <MDBContainer>
      <h3>New Address</h3>
      <AddressForm callback={onSubmit} />
      <MDBRow style={{ padding: '25px' }} center={true}>
        <Maps position={position} setPosition={callback} />
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

export default Address;
