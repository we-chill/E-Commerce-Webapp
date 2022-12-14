import { StateCreator, StoreApi } from 'zustand';

export interface NavbarSlideOverSlice {
  navbarSlideOver: {
    isOpen: boolean;
    setIsOpen: (isNavbarSlideOverOpened: boolean) => void;
  };
  cartSlideOver: {
    isOpen: boolean;
    setIsOpen: (isCartSlideOverOpened: boolean) => void;
  };
}

const createNavbarSlideOverSlice: StateCreator<NavbarSlideOverSlice> | StoreApi<NavbarSlideOverSlice> = (set, get) => ({
  navbarSlideOver: {
    isOpen: false,
    setIsOpen: (isNavbarSlideOverOpened) => {
      set(() => ({
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
        cartSlideOver: {
          ...get().cartSlideOver,
          isOpen: isCartSlideOverOpened,
        },
      }));
    },
  },
});

export default createNavbarSlideOverSlice as (
  set: StoreApi<NavbarSlideOverSlice>['setState'],
  get: StoreApi<NavbarSlideOverSlice>['getState'],
  api: StoreApi<NavbarSlideOverSlice>
) => NavbarSlideOverSlice;
