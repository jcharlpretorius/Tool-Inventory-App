import { AiOutlineDashboard, AiOutlineShoppingCart } from 'react-icons/ai';
import {
  MdOutlineAddBox,
  MdAccountBox,
  MdOutlinePersonAddAlt,
} from 'react-icons/md';
import { FaWarehouse, FaFileInvoiceDollar } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { FiTruck } from 'react-icons/fi';

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
    title: 'Inventory',
    icon: <FaWarehouse />,
    path: '/inventory',
  },

  {
    title: 'Cart',
    icon: <AiOutlineShoppingCart />,
    path: '/cart',
  },
  {
    title: 'Customers',
    icon: <HiUserGroup />,
    path: '/customer',
  },
  {
    title: 'Add Customer',
    icon: <MdOutlinePersonAddAlt />,
    path: '/add-customer',
  },
  {
    title: 'Add Tool',
    icon: <MdOutlineAddBox />,
    path: '/add-tool',
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
    title: 'Order',
    icon: <FiTruck />,
    path: '/order',
  },
];

export default menu;
