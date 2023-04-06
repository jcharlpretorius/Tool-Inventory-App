import { AiOutlineDashboard } from 'react-icons/ai';
import { MdOutlineAddBox, MdAccountBox } from 'react-icons/md';
import { FaWarehouse } from 'react-icons/fa';

const menu = [
  {
    title: 'Inventory',
    icon: <FaWarehouse />,
    path: '/inventory',
  },
  {
    title: 'Add Tool',
    icon: <MdOutlineAddBox />,
    path: '/add-tool',
  },
  {
    title: 'Emloyee Account',
    icon: <MdAccountBox />,
    children: [
      {
        title: 'Profile',
        path: '/employee-profile',
      },
      {
        title: 'Edit Profile',
        path: '/edit-employee-profile',
      },
    ],
  },
];

export default menu;
