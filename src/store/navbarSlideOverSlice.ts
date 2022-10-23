import { StateCreator, StoreApi } from 'zustand';

export interface NavbarSlideOverSlice {
  navbarSlideOver: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  };
}

const createNavbarSlideOverSlice: StateCreator<NavbarSlideOverSlice> | StoreApi<NavbarSlideOverSlice> = (set, get) => ({
  navbarSlideOver: {
    isOpen: false,
    setIsOpen: (isOpen) => {
      set(() => ({
        navbarSlideOver: {
          ...get().navbarSlideOver,
          isOpen: isOpen,
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
