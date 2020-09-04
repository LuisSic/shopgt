import {
  ErrorActionTypes,
  ErrorState,
  ErrorTypes,
} from '../actions/error/types';

const initialState: ErrorState = {
  error: [],
  isOpen: false,
};

export default (state = initialState, action: ErrorActionTypes): ErrorState => {
  switch (action.type) {
    case ErrorTypes.SET_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case ErrorTypes.HIDE_ERROR:
      return {
        ...state,
        error: [],
        isOpen: false,
      };

    default:
      return state;
  }
};
