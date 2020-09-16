export enum ShopCartTypes {
  ADD_ITEMCARD = 'ADD_ITEM',
  FETCH_CARDSHOP = 'FETCH_CARDSHOP',
  DELETE_ITEMCARD = 'DELETE_ITEMCARD',
  SELECT_ADDRESS = 'SELECT_ADDRESS',
  CLEAN_CARD = 'CLEAN_CARD',
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
export interface ShopCartItem {
  product: Product;
  quantity: number;
}

export interface ShopCartRequest {
  productId: string;
  quantity: number;
}

interface AddItemCard {
  type: ShopCartTypes.ADD_ITEMCARD;
  payload: ShopCartResponse;
}

interface DeleteItemCard {
  type: ShopCartTypes.DELETE_ITEMCARD;
  payload: string;
}

interface FetchCardShop {
  type: ShopCartTypes.FETCH_CARDSHOP;
  payload: ShopCartResponse;
}

interface SelectAddress {
  type: ShopCartTypes.SELECT_ADDRESS;
  payload: string;
}

interface CleanCard {
  type: ShopCartTypes.CLEAN_CARD;
}

export type CartActionsTypes =
  | AddItemCard
  | DeleteItemCard
  | FetchCardShop
  | SelectAddress
  | CleanCard;
