export enum Address {
  CREATE_ADDRESS = 'CREATE_ADDRESS',
  FETCH_ADDRESSES = 'FETCH_ADDRESSES',
  FETCH_ADDRESS = 'FETCH_ADDRESS',
  DELETE_ADDRESS = 'DELETE_ADDRESS',
  EDIT_ADDRESS = 'EDIT_ADDRESS',
}

export interface AddressState {
  id: string;
  address: string;
  country: string;
  deparment: string;
  township: string;
  status: boolean;
  version: number;
  position: {
    long: string;
    lat: string;
  };
  userId: string;
}

export interface AddressRequest {
  address: string;
  country: string;
  deparment: string;
  township: string;
  position: {
    long: string;
    lat: string;
  };
}

interface CreateAddress {
  type: Address.CREATE_ADDRESS;
  payload: AddressState;
}

interface FetchAddresses {
  type: Address.FETCH_ADDRESSES;
  payload: AddressState[];
}

interface FetchAddress {
  type: Address.FETCH_ADDRESS;
  payload: AddressState;
}

interface DeleteAddress {
  type: Address.DELETE_ADDRESS;
  payload: string;
}

interface EditAddress {
  type: Address.EDIT_ADDRESS;
  payload: AddressState;
}

export type AddressActionTypes =
  | CreateAddress
  | FetchAddress
  | FetchAddresses
  | DeleteAddress
  | EditAddress;
