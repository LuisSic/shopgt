import { OrderTypes, Order, OrderActionsTypes } from './types';

export const createOrder = (order: Order): OrderActionsTypes => {
  return {
    type: OrderTypes.CREATE_ORDER,
    payload: order,
  };
};

export const cancelOrder = (order: Order): OrderActionsTypes => {
  return {
    type: OrderTypes.CANCEL_ORDER,
    payload: order,
  };
};

export const fetchOrder = (order: Order): OrderActionsTypes => {
  return {
    type: OrderTypes.FETCH_ORDER,
    payload: order,
  };
};

export const fetchOrders = (order: Order[]): OrderActionsTypes => {
  return {
    type: OrderTypes.FETCH_ORDERS,
    payload: order,
  };
};
