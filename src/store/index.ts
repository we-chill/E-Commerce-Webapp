import create, { StoreApi } from 'zustand';
import createHomePageSlice, { HomePageSlice } from './homeSlice';

type StoreType = HomePageSlice;

export const useStore = create<StoreType>((set, get, api) => ({
  ...createHomePageSlice(
    set as unknown as StoreApi<HomePageSlice>['setState'],
    get as StoreApi<HomePageSlice>['getState'],
    api as unknown as StoreApi<HomePageSlice>
  ),
}));

export default useStore;
