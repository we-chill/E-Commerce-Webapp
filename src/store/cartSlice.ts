import { StateCreator, StoreApi } from 'zustand';

import { Product, ProductInCart } from '@/types';
import { MOCK_100_PRODUCTS } from '@/constants';

type CartItemListAndQuantity = {
  [id: Product['id']]: ProductInCart;
};

export interface CartSlice {
  cart: {
    totalPrice: number;
    itemListAndQuantity: CartItemListAndQuantity;
    addItemToCart: (product: Product | ProductInCart, quantity?: number) => void;
    decreaseItemQuantity: (id: Product['id'], quantity: number) => void;
    removeItemFromCart: (id: Product['id']) => void;
  };
}

export const mockItemListAndQuantity: CartItemListAndQuantity = {
  0: {
    ...MOCK_100_PRODUCTS[0],
    count: 1,
  },
  1: {
    ...MOCK_100_PRODUCTS[1],
    count: 1,
  },
  2: {
    ...MOCK_100_PRODUCTS[2],
    count: 1,
  },
};

const createCartSlice: StateCreator<CartSlice> | StoreApi<CartSlice> = (set, get) => ({
  cart: {
    totalPrice: 0,
    itemListAndQuantity: mockItemListAndQuantity,
    addItemToCart: (product, quantity = 1) => {
      const { id } = product;
      if (quantity <= 0) {
        throw new Error('Params error! Quantity must GREATER than 0');
      }

      const newItemListAndQuantity = {
        ...get().cart.itemListAndQuantity,
      };
      const newItem: ProductInCart = {
        ...product,
        count: newItemListAndQuantity[id]?.count ?? 0,
      };
      newItem.count = newItem.count + quantity;
      newItemListAndQuantity[id] = newItem;

      const newTotalPrice = get().cart.totalPrice + newItem.price * quantity;

      set(() => ({
        cart: {
          ...get().cart,
          itemListAndQuantity: newItemListAndQuantity,
          totalPrice: newTotalPrice,
        },
      }));
    },
    decreaseItemQuantity: (id, quantity = 1) => {
      if (quantity >= 0) {
        throw new Error('Params error! Quantity must SMALLER than 0');
      }

      const newItemListAndQuantity = {
        ...get().cart.itemListAndQuantity,
      };
      if (!newItemListAndQuantity[id]) {
        return;
      }

      const prevCount = newItemListAndQuantity[id]?.count ?? 0;
      const item: ProductInCart = {
        ...newItemListAndQuantity[id],
        count: prevCount,
      };
      item.count = item.count - quantity;
      let newTotalPrice = get().cart.totalPrice;
      if (item.count <= 0) {
        delete newItemListAndQuantity[id];
        newTotalPrice -= prevCount * item.price;
      } else {
        newItemListAndQuantity[id] = item;
        newTotalPrice -= quantity * item.price;
      }

      set(() => ({
        cart: {
          ...get().cart,
          itemListAndQuantity: newItemListAndQuantity,
          totalPrice: newTotalPrice,
        },
      }));
    },
    removeItemFromCart: (id) => {
      const newItemListAndQuantity = {
        ...get().cart.itemListAndQuantity,
      };
      if (!newItemListAndQuantity[id]) {
        return;
      }

      const item = newItemListAndQuantity[id];
      const newTotalPrice = get().cart.totalPrice - item.count * item.price;
      delete newItemListAndQuantity[id];
      set(() => ({
        cart: {
          ...get().cart,
          itemListAndQuantity: newItemListAndQuantity,
          totalPrice: newTotalPrice,
        },
      }));
    },
  },
});

export default createCartSlice as (
  set: StoreApi<CartSlice>['setState'],
  get: StoreApi<CartSlice>['getState'],
  api: StoreApi<CartSlice>
) => CartSlice;
