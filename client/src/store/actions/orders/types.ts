import { ShopCartItem } from '../shopCart/types';
export enum OrderTypes {
  CREATE_ORDER = 'CREATE_ORDER',
  CANCEL_ORDER = 'CANCEL_ORDER',
  FETCH_ORDER = 'FETCH_ORDER',
  FETCH_ORDERS = 'FETCH_ORDERS',
}

interface Address {
  address: string;
  country: string;
  deparment: string;
  township: string;
  name: string;
}

export interface OrderRequest {
  total: number;
  addressId: string;
  shopCartId: string;
  shopCart: Array<ShopCartItem>;
  date: string;
}

export interface OrderState {
  [id: string]: Order;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  homeAddress: Address;
  shopCart: Array<ShopCartItem>;
  status: string;
  shopCartId: string;
  version: number;
  dateOrder: string;
}

interface CreateOrder {
  type: OrderTypes.CREATE_ORDER;
  payload: Order;
}

interface CancelOrder {
  type: OrderTypes.CANCEL_ORDER;
  payload: Order;
}

interface FetchOrder {
  type: OrderTypes.FETCH_ORDER;
  payload: Order;
}

interface FetchOrders {
  type: OrderTypes.FETCH_ORDERS;
  payload: Order[];
}

export type OrderActionsTypes =
  | CreateOrder
  | CancelOrder
  | FetchOrders
  | FetchOrder;
