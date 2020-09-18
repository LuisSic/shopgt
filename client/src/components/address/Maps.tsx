import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
interface Position {
  lat: number;
  lng: number;
}

interface Props {
  position: {
    lat: number;
    lng: number;
  } | null;
  setPosition: (userPosition: Position) => void;
}

const mapContainersStyle = {
  width: '80vw',
  height: '50vh',
};

const options = {
  disableDefaultUi: true,
  zoomControl: true,
};

const center = {
  lat: 15.783471,
  lng: -90.5315,
};

const Maps = ({ position, setPosition }: Props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  const onClickMarker = (e: google.maps.MouseEvent) => {
    setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainersStyle}
        zoom={7}
        center={center}
        onClick={onClickMarker}
        options={options}
      >
        {position && (
          <Marker position={{ lat: position.lat, lng: position.lng }}></Marker>
        )}
      </GoogleMap>
    </>
  );
};

export default Maps;
