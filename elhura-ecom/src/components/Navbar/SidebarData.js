import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
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
    title: 'Créer un Compte',
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
    title: 'Se Connecter',
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
    title: 'Se Déconnecter',
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