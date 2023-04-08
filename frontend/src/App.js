import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import AddTool from './pages/addTool/AddTool';
import EditTool from './pages/editTool/EditTool';
import Sidebar from './components/sidebar/Sidebar';
import Inventory from './pages/inventory/Inventory';
import Layout from './components/layout/Layout';
import ToolDetail from './components/tool/toolDetail/ToolDetail';
import Sales from './pages/sales/Sales';
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

// makes sure you are able to save the credentials of employee, whenever you make a request
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch(); // dispatch function, for updating redux state

  useEffect(() => {
    // get employee login status
    async function loginStatus() {
      const isLoggedIn = await getLoginStatus();

      dispatch(SET_LOGIN(isLoggedIn));
    }
    loginStatus();

    // load the cart from local storage
    dispatch(LOAD_CART());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/cart" element={<Cart />}></Route> */}

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
                <AddTool />
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
                <EditTool />
              </Layout>
            </Sidebar>
          }
        />
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
        <Route
          path="/cart"
          element={
            <Sidebar>
              <Layout>
                <Cart />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/checkout"
          element={
            <Sidebar>
              <Layout>
                <Checkout />
              </Layout>
            </Sidebar>
          }
        />
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
          path="/sales"
          element={
            <Sidebar>
              <Layout>
                <Sales />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
