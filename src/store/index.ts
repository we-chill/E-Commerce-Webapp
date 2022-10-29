import create, { StoreApi } from 'zustand';
import createCartSlice, { CartSlice } from './cartSlice';
import createHomePageSlice, { HomePageSlice } from './homeSlice';
import createNavbarSlideOverSlice, { NavbarSlideOverSlice } from './navbarSlideOverSlice';

type StoreType = CartSlice & HomePageSlice & NavbarSlideOverSlice;

export const useStore = create<StoreType>((set, get, api) => ({
  ...createCartSlice(
    set as unknown as StoreApi<CartSlice>['setState'],
    get as StoreApi<CartSlice>['getState'],
    api as unknown as StoreApi<CartSlice>
  ),
  ...createHomePageSlice(
    set as unknown as StoreApi<HomePageSlice>['setState'],
    get as StoreApi<HomePageSlice>['getState'],
    api as unknown as StoreApi<HomePageSlice>
  ),
  ...createNavbarSlideOverSlice(
    set as unknown as StoreApi<NavbarSlideOverSlice>['setState'],
    get as StoreApi<NavbarSlideOverSlice>['getState'],
    api as unknown as StoreApi<NavbarSlideOverSlice>
  ),
}));

export default useStore;
