import { ErrorActionTypes, ErrorState, ErrorTypes } from './types';

export const setError = (err: ErrorState): ErrorActionTypes => {
  return {
    type: ErrorTypes.SET_ERROR,
    payload: err,
  };
};
export const hideError = (): ErrorActionTypes => {
  return {
    type: ErrorTypes.HIDE_ERROR,
  };
};
