import { StateCreator, StoreApi } from 'zustand';

import { Product, ProductInCart } from '@/types';

type CartItemListAndQuantity = {
  [id: Product['id']]: ProductInCart;
};

export interface CartSlice {
  cart: {
    totalPrice: number;
    itemListAndQuantity: CartItemListAndQuantity;
    addProductToCart: (product: Product | ProductInCart) => void;
    increaseProductQuantity: (id: Product['id'], quantity: number) => void;
    decreaseProductQuantity: (id: Product['id'], quantity: number) => void;
    removeProductFromCart: (id: Product['id']) => void;
  };
}

const createCartSlice: StateCreator<CartSlice> | StoreApi<CartSlice> = (set, get) => ({
  cart: {
    totalPrice: 0,
    itemListAndQuantity: {},
    addProductToCart: (product) => {
      const newItemListAndQuantity = {
        ...get().cart.itemListAndQuantity,
      };
      const doesProductExist = !!newItemListAndQuantity[product.id];
      if (doesProductExist) {
        get().cart.increaseProductQuantity(product.id, 1);
        return;
      }

      newItemListAndQuantity[product.id] = {
        ...product,
        count: 1,
      };
      const newTotalPrice = get().cart.totalPrice + product.price;
      set(() => ({
        cart: {
          ...get().cart,
          itemListAndQuantity: newItemListAndQuantity,
          totalPrice: newTotalPrice,
        },
      }));
    },
    increaseProductQuantity: (id, quantity = 1) => {
      if (quantity <= 0) {
        throw new Error('Params error! Quantity must GREATER than 0');
      }

      const newItemListAndQuantity = {
        ...get().cart.itemListAndQuantity,
      };
      const item = newItemListAndQuantity[id];
      if (!item) {
        throw new Error('Product is not exist in the list');
      }

      item.count += quantity;
      newItemListAndQuantity[id] = item;
      const newTotalPrice = get().cart.totalPrice + item.price * quantity;
      set(() => ({
        cart: {
          ...get().cart,
          itemListAndQuantity: newItemListAndQuantity,
          totalPrice: newTotalPrice,
        },
      }));
    },
    decreaseProductQuantity: (id, quantity = 1) => {
      if (quantity < 0) {
        throw new Error('Params error! Quantity must GREATER than 0');
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
    removeProductFromCart: (id) => {
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
