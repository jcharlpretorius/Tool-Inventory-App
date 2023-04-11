import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import AddTool from './pages/addTool/AddTool';
import EditTool from './pages/editTool/EditTool';
import Sidebar from './components/sidebar/Sidebar';
import Inventory from './pages/inventory/Inventory';
import Layout from './components/layout/Layout';
import ToolDetail from './components/tool/toolDetail/ToolDetail';
import RecentSales from './pages/sales/RecentSales';
import TopSales from './pages/sales/TopSales';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';
import EmployeeProfile from './pages/employeeProfile/EmployeeProfile';
import EditEmployeeProfile from './pages/employeeProfile/EditEmployeeProfile';
import Cart from './components/cart/Cart';
import { LOAD_CART } from './redux/features/cart/cartSlice';
import Checkout from './pages/checkout/Checkout';
import Customer from './pages/customer/Customer';
import CustomerDetail from './components/customer/customerDetail/CustomerDetail';
import EditCustomer from './pages/editCustomer/EditCustomer';
import AddCustomer from './pages/addCustomer/AddCustomer';
import OrderCart from './components/order/OrderCart';

// makes sure you are able to save the credentials of employee, whenever you make a request
axios.defaults.withCredentials = true;

function App() {
  const ROLES = {
    SALES: 'sales',
    MNGR: 'manager',
  };
  const dispatch = useDispatch(); // dispatch function, for updating redux state

  useEffect(() => {
    // get employee login status
    async function loginStatus() {
      const isLoggedIn = await getLoginStatus();

      dispatch(SET_LOGIN(isLoggedIn));
    }
    loginStatus();

    // dispatch(getRecentSales());
    // dispatch(getTopSalesMen());

    // load the cart from local storage
    dispatch(LOAD_CART());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* Tool Routes */}
        <Route
          path="/inventory"
          element={
            <Sidebar>
              <Layout>
                <Inventory />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-tool"
          element={
            <Sidebar>
              <Layout>
                <AddTool allowedRole={ROLES.MNGR} />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/tool-details/:id"
          element={
            <Sidebar>
              <Layout>
                <ToolDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-tool/:id"
          element={
            <Sidebar>
              <Layout>
                <EditTool allowedRole={ROLES.MNGR} />
              </Layout>
            </Sidebar>
          }
        />
        {/* Logged in Employee routes */}
        <Route
          path="employee-profile"
          element={
            <Sidebar>
              <Layout>
                <EmployeeProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="edit-employee-profile"
          element={
            <Sidebar>
              <Layout>
                <EditEmployeeProfile />
              </Layout>
            </Sidebar>
          }
        />
        {/* Checkout routes */}
        <Route
          path="/cart"
          element={
            <Sidebar>
              <Layout>
                <Cart allowedRole={ROLES.SALES} />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/checkout"
          element={
            <Sidebar>
              <Layout>
                <Checkout allowedRole={ROLES.SALES} />
              </Layout>
            </Sidebar>
          }
        />
        {/* Customer routes */}
        <Route
          path="/customer"
          element={
            <Sidebar>
              <Layout>
                <Customer />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-customer"
          element={
            <Sidebar>
              <Layout>
                <AddCustomer />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/customer-details/:id"
          element={
            <Sidebar>
              <Layout>
                <CustomerDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-customer/:id"
          element={
            <Sidebar>
              <Layout>
                <EditCustomer />
              </Layout>
            </Sidebar>
          }
        />
        {/* Sales Routes */}
        <Route
          path="/recent-sales"
          element={
            <Sidebar>
              <Layout>
                <RecentSales allowedRole={ROLES.MNGR} />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/top-sales"
          element={
            <Sidebar>
              <Layout>
                <TopSales allowedRole={ROLES.MNGR} />
              </Layout>
            </Sidebar>
          }
        />
        {/* Orders Routes */}
        <Route
          path="/order"
          element={
            <Sidebar>
              <Layout>
                <OrderCart allowedRole={ROLES.MNGR} />
              </Layout>
            </Sidebar>
          }
        />
        {/* Any other routes, 404 page */}
        {/* <Route path="*" element={<Missing />} /> */}
      </Routes>

      <ToastContainer position="top-left" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
