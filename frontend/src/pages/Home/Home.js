import React from 'react';
import { FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Home.scss';
import {
  ShowOnLogin,
  ShowOnLogout,
} from '../../components/protect/HiddenLinks';

const Home = () => {
  return (
    <div className="home">
      {/*class names like --flex-between utility classes to make my life easier, see index.css*/}
      <nav className="container --flex-between">
        <div className="logo">
          <FaTools size={60} />
        </div>
        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-home">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-home {">
                <Link to="/inventory">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* INFO SECTION */}
      <section className="container info">
        <div className="info-text">
          <h2>Toolshop Inventory Management App</h2>
          <h4>
            An inventory management system to manage information about products
            in stock, sales, customer, employees, and suppliers. Easily make
            orders from suppliers and process purchases for customers
          </h4>
        </div>
      </section>
    </div>
  );
};

export default Home;
