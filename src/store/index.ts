import create, { StoreApi } from 'zustand';
import createHomePageSlice, { HomePageSlice } from './homeSlice';
import createNavbarSlideOverSlice, { NavbarSlideOverSlice } from './navbarSlideOverSlice';

type StoreType = HomePageSlice & NavbarSlideOverSlice;

export const useStore = create<StoreType>((set, get, api) => ({
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
