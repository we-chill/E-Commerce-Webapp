import React, { FC } from 'react';

import SidebarItem from './SidebarItem';
import useStore from '@/store';
import { HomePageSectionType } from '@/constants';

const Sidebar: FC = () => {
  const { activeSection, setActiveSection } = useStore((state) => state.homePage);

  const homeItem = (
    <SidebarItem
      label="Home"
      boxiconName="home"
      isActive={activeSection === HomePageSectionType.HOME}
      onClick={() => {
        setActiveSection(HomePageSectionType.HOME);
      }}
    />
  );

  const newInItem = (
    <SidebarItem
      label="New in"
      boxiconName="cool"
      isActive={activeSection === HomePageSectionType.NEW_IN}
      onClick={() => {
        setActiveSection(HomePageSectionType.NEW_IN);
      }}
    />
  );

  const comboItem = (
    <SidebarItem
      label="Combo"
      boxiconName="home"
      isActive={activeSection === HomePageSectionType.COMBO}
      onClick={() => {
        setActiveSection(HomePageSectionType.COMBO);
      }}
    />
  );

  return (
    <div className="pr-16 flex flex-col space-y-5">
      {homeItem}
      {newInItem}
      {comboItem}
    </div>
  );
};

export default Sidebar;
