import { StateCreator, StoreApi } from 'zustand';

export interface SlideOverSlice {
  navbarSlideOver: {
    isOpen: boolean;
    setIsOpen: (isNavbarSlideOverOpened: boolean) => void;
  };
  cartSlideOver: {
    isOpen: boolean;
    setIsOpen: (isCartSlideOverOpened: boolean) => void;
  };
}

const createSlideOverSlice: StateCreator<SlideOverSlice> | StoreApi<SlideOverSlice> = (set, get) => ({
  navbarSlideOver: {
    isOpen: false,
    setIsOpen: (isNavbarSlideOverOpened) => {
      set(() => ({
        ...get(),
        navbarSlideOver: {
          ...get().navbarSlideOver,
          isOpen: isNavbarSlideOverOpened,
        },
      }));
    },
  },
  cartSlideOver: {
    isOpen: false,
    setIsOpen: (isCartSlideOverOpened) => {
      set(() => ({
        ...get(),
        cartSlideOver: {
          ...get().navbarSlideOver,
          isOpen: isCartSlideOverOpened,
        },
      }));
    },
  },
});

export default createSlideOverSlice as (
  set: StoreApi<SlideOverSlice>['setState'],
  get: StoreApi<SlideOverSlice>['getState'],
  api: StoreApi<SlideOverSlice>
) => SlideOverSlice;
