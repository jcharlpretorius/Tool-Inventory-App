import { AiOutlineDashboard, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlineAddBox, MdAccountBox } from 'react-icons/md';
import { FaWarehouse, FaFileInvoiceDollar } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';

const menu = [
  {
    title: 'Employee Account',
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
  {
    title: 'Sales',
    icon: <FaFileInvoiceDollar />,
    children: [
      {
        title: 'Recent Sales',
        path: '/recent-sales',
      },
      {
        title: 'Top Sales',
        path: '/top-sales',
      },
    ],
  },
  {
    title: 'Customers',
    icon: <HiUserGroup />,
    path: '/customer',
  },
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
    title: 'Cart',
    icon: <AiOutlineShoppingCart />,
    path: '/cart',
  },
];

export default menu;
