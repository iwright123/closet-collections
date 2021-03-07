import * as React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChatIcon from '@material-ui/icons/Chat';

import SearchIcon from '@material-ui/icons/Search';


export const SidebarData = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/',
    cName: 'nav-text',
  },
  {
    title: 'Closet',
    icon: <MeetingRoomIcon />,
    link: '/closet'
  },
  {
    cName: 'nav-text',
    title: 'Public Outfits',
    icon: <AccessibilityIcon />,
    link: '/outfits'
  },
  {
    cName: 'nav-text',
    title: 'Calendar',
    icon: <EventAvailableIcon />,
    link: '/calendar'
  },
  {
    cName: 'nav-text',
    title: 'Chat Room',
    icon: <ChatIcon />,
    link: '/chat'
  },
  {
    title: 'Find A Store',
    icon: <SearchIcon />,
    link: '/findastore'
  }
  // {
  //   cName: 'nav-text',
  //   title: 'Logout',
  //   icon: <ExitToAppIcon />,
  //   link: '/logout'
  // },
];


