import {
  LoaderState,
  LoaderActionsTypes,
  LoaderTypes,
} from '../actions/loader/types';

const initialState: LoaderState = {
  isLoading: false,
};

export default (
  state = initialState,
  action: LoaderActionsTypes
): LoaderState => {
  switch (action.type) {
    case LoaderTypes.SHOW_LOADER:
      return { ...state, isLoading: true };
    case LoaderTypes.HIDE_LOADER:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
