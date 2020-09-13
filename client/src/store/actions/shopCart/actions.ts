import { CartActionsTypes, ShopCartResponse, ShopCartTypes } from './types';

export const addCardItem = (item: ShopCartResponse): CartActionsTypes => {
  return {
    type: ShopCartTypes.ADD_ITEMCARD,
    payload: item,
  };
};

export const deleteCardItem = (id: string): CartActionsTypes => {
  return {
    type: ShopCartTypes.DELETE_ITEMCARD,
    payload: id,
  };
};

export const fetchShopCard = (items: ShopCartResponse): CartActionsTypes => {
  return {
    type: ShopCartTypes.FETCH_CARDSHOP,
    payload: items,
  };
};

export const selectedAddress = (id: string): CartActionsTypes => {
  return {
    type: ShopCartTypes.SELECT_ADDRESS,
    payload: id,
  };
};
