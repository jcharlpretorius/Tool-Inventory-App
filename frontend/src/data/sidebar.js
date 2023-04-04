import { AiOutlineDashboard } from 'react-icons/ai';
import { MdOutlineAddBox, MdAccountBox } from 'react-icons/md';

const menu = [
  {
    title: 'Dashboard',
    icon: <AiOutlineDashboard />,
    path: '/dashboard',
  },
  {
    title: 'Add Product',
    icon: <MdOutlineAddBox />,
    path: '/add-product',
  },
  {
    title: 'Emloyee Account',
    icon: <MdAccountBox />,
    children: [
      {
        title: 'Profile',
        path: '/profile',
      },
      {
        title: 'Edit Profile',
        path: '/profile-update',
      },
    ],
  },
];

export default menu;
