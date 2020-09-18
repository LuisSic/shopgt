import { LoaderTypes, LoaderActionsTypes } from './types';

export const showLoader = (): LoaderActionsTypes => {
  return {
    type: LoaderTypes.SHOW_LOADER,
  };
};

export const hideLoader = (): LoaderActionsTypes => {
  return {
    type: LoaderTypes.HIDE_LOADER,
  };
};
