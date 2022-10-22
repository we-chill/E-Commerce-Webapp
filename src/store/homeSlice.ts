import { StateCreator, StoreApi } from 'zustand';

import { HomePageSectionType } from '@/constants';

export interface HomePageSlice {
  homePage: {
    activeSection: HomePageSectionType;
    setActiveSection: (activeSection: HomePageSectionType) => void;
  };
}

const createHomePageSlice: StateCreator<HomePageSlice> | StoreApi<HomePageSlice> = (set, get) => ({
  homePage: {
    activeSection: HomePageSectionType.HOME,
    setActiveSection: (activeSection) => {
      set(() => ({
        homePage: {
          ...get().homePage,
          activeSection,
        },
      }));
    },
  },
});

export default createHomePageSlice as (
  set: StoreApi<HomePageSlice>['setState'],
  get: StoreApi<HomePageSlice>['getState'],
  api: StoreApi<HomePageSlice>
) => HomePageSlice;
