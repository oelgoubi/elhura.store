import React from 'react';
import { SidebarData } from "../components/Navbar/SidebarData";
import { MenuBarData } from "../components/Navbar/MenuBarData";

const otherRoutes = [
    {
        id: 'register-choices',
        title: 'Register choices',
        path: '/register/choices',
        cName: 'nav-text',
        show: {
            authenticated: true,
            unauthenticated: true
        },
        showToUser: [-1]
    },
    {
        id: 'register-confirm',
        title: 'Register confirm',
        path: '/register/confirm',
        cName: 'nav-text',
        show: {
            authenticated: true,
            unauthenticated: true
        },
        showToUser: [-1]
    }
]

export const routeData = () => {
    return otherRoutes.concat(SidebarData).concat(MenuBarData)
}