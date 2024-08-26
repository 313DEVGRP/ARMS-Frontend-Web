import { createContext, useEffect, useState } from "react"
import {
    MonitorDown,
    Home,
    Settings,
    PackagePlus,
    BookHeart,
    Loader,
  } from "lucide-react"

export const SubMenuContext = createContext();

export const SubMenuContextProvider = ({children}) => {

  const value = [
    {
      to: "/",
      title: "Getting Started",
      Icon: ()=> (<Home />),
    }, 
    {
      to: "/guide",
      title: "Guide",
      Icon: ()=> (<MonitorDown />),
    },
    {
      to: "#",
      title: "Reference",
      Icon: ()=> (<Settings />),
    },
    {
      to: "#",
      title: "Still need help?",
      Icon: ()=> (<PackagePlus />),
      subMenus: [
        { id: 1, to: '/', title: 'submenu 1' },
        { id: 2, to: '#', title: 'submenu 2' },
        { id: 3, to: '#', title: 'submenu 3' },
      ]
    },
    {
      to: "#",
      title: "Community",
      Icon: ()=> (<BookHeart />),
      subMenus: [
        { id: 1, to: '#', title: 'submenu 1' },
        { id: 2, to: '#', title: 'submenu 2' },
      ]
    },
  ];

  return (
    <SubMenuContext.Provider value={value}>
      {children}
    </SubMenuContext.Provider>
  );
};
