import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    id: 'home',
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    show: {
      authenticated: true,
      unauthenticated: true
    },
    showToUser: [-1]
  },
  {
    id: 'reports',
    title: 'Reports',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    show: {
      authenticated: true,
      unauthenticated: false
    },
    showToUser: [2]
  },
  {
    id: 'products',
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    show: {
      authenticated: true,
      unauthenticated: false
    },
    showToUser: [2]
  },
  {
    id: 'team',
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
    show: {
      authenticated: true,
      unauthenticated: false
    },
    showToUser: [2]
  },
  {
    id: 'messages',
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text',
    show: {
      authenticated: true,
      unauthenticated: false
    },
    showToUser: [1,2]
  },
  {
    id: 'register',
    title: 'Register',
    path: '/register',
    icon: <AiIcons.AiOutlineUserAdd />,
    cName: 'nav-text',
    show: {
      authenticated: false,
      unauthenticated: true
    },
    showToUser: [-1]
  },
  {
    id: 'login',
    title: 'Login',
    path: '/login',
    icon: <AiIcons.AiOutlineLogin />,
    cName: 'nav-text',
    show: {
      authenticated: false,
      unauthenticated: true
    },
    showToUser: [-1]
  },
  {
    id: 'support',
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    show: {
      authenticated: true,
      unauthenticated: true
    },
    showToUser: [-1]
  },
  {
    id: 'logout',
    title: 'Logout',
    path: '/logout',
    icon: <AiIcons.AiOutlineLogout />,
    cName: 'nav-text',
    show: {
      authenticated: true,
      unauthenticated: false
    },
    showToUser: [-1]
  }
];