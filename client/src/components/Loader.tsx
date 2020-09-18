import './loader.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
const Loader = () => {
  const loaderSelector = (state: RootState) => state.loader;
  const loader = useSelector(loaderSelector);
  return (
    <>
      {loader.isLoading && (
        <div className="loader-container">
          <div className="spinner-border loader" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
