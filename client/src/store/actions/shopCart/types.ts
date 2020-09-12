export enum ShopCart {
  ADD_ITEMCARD = 'ADD_ITEM',
  FETCH_CARDSHOP = 'FETCH_CARDSHOP',
  DELETE_ITEMCARD = 'DELETE_ITEMCARD',
  SELECT_ADDRESS = 'SELECT_ADDRESS',
}

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  keyimage: string;
  version: number;
}

export interface ShopCartResponse {
  id: string;
  userId: string;
  orderId: string;
  items: ShopCartItem[];
  version: number;
}

export interface ShopCartState {
  id: string;
  addressId: string;
  items: { [id: string]: ShopCartItem };
}
interface ShopCartItem {
  product: Product;
  quantity: number;
}

export interface ShopCartRequest {
  productId: string;
  quantity: number;
}

interface AddItemCard {
  type: ShopCart.ADD_ITEMCARD;
  payload: ShopCartResponse;
}

interface DeleteItemCard {
  type: ShopCart.DELETE_ITEMCARD;
  payload: string;
}

interface FetchCardShop {
  type: ShopCart.FETCH_CARDSHOP;
  payload: ShopCartResponse;
}

interface SelectAddress {
  type: ShopCart.SELECT_ADDRESS;
  payload: string;
}

export type ShopCartTypes =
  | AddItemCard
  | DeleteItemCard
  | FetchCardShop
  | SelectAddress;
