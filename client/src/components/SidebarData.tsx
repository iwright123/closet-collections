import * as React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


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
    title: 'Outfit',
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
    title: 'Logout',
    icon: <ExitToAppIcon />,
    link: '/logout'
  },
];


