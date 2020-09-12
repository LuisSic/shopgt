import { ShopCartTypes, ShopCartResponse, ShopCart } from './types';

export const addCardItem = (item: ShopCartResponse): ShopCartTypes => {
  return {
    type: ShopCart.ADD_ITEMCARD,
    payload: item,
  };
};

export const deleteCardItem = (id: string): ShopCartTypes => {
  return {
    type: ShopCart.DELETE_ITEMCARD,
    payload: id,
  };
};

export const fetchShopCard = (items: ShopCartResponse): ShopCartTypes => {
  return {
    type: ShopCart.FETCH_CARDSHOP,
    payload: items,
  };
};

export const selectedAddress = (id: string): ShopCartTypes => {
  return {
    type: ShopCart.SELECT_ADDRESS,
    payload: id,
  };
};
