import React from 'react';

export const MenuBarData = [
    {
        id: 'add-articles',
        title: 'Add articles',
        path: '/articles/add',
        cName: 'nav-text',
        show: {
            authenticated: true,
            unauthenticated: true
        },
        showToUser: [-1]
    },
    {
        id: 'categories',
        title: 'Categories',
        path: '/articles/categories',
        cName: 'nav-text',
        show: {
            authenticated: true,
            unauthenticated: true
        },
        showToUser: [-1]
    }
];