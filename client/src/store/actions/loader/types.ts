export enum LoaderTypes {
  SHOW_LOADER = 'SHOW_LOADER',
  HIDE_LOADER = 'HIDE_LOADER',
}

export interface LoaderState {
  isLoading: boolean;
}

interface ShowLoader {
  type: LoaderTypes.SHOW_LOADER;
}

interface HideLoader {
  type: LoaderTypes.HIDE_LOADER;
}

export type LoaderActionsTypes = ShowLoader | HideLoader;
