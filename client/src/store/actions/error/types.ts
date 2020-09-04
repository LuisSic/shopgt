export enum ErrorTypes {
  SET_ERROR = 'SET_ERROR',
  HIDE_ERROR = 'HIDE_ERROR',
}

interface Error {
  message: string;
  field?: string;
}
export interface ErrorState {
  error: Error[];
  isOpen: boolean;
}

interface SetError {
  type: ErrorTypes.SET_ERROR;
  payload: ErrorState;
}

interface HideError {
  type: ErrorTypes.HIDE_ERROR;
}

export type ErrorActionTypes = SetError | HideError;
