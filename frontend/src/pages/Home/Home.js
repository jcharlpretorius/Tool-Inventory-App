import React from 'react';
import { FaToolbox, FaTools } from 'react-icons/fa'; // add first 2 characters after the forward slash
import { Link } from 'react-router-dom';
import './Home.scss';
import {
  ShowOnLogin,
  ShowOnLogout,
} from '../../components/protect/HiddenLinks';
// import heroImg from '../../assets/inv-img.png';

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
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary {">
                <Link to="/inventory">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
          <h2>Toolshop Inventory Management App</h2>
          <p>
            Inventory management system to make orders from suppliers, process
            purchases for customers, and manage products in the inventory
          </p>
        </div>
        {/* removed image for now */}
        {/* <div className="hero-image">
          <img src={heroImg} alt="Toolshop" />
        </div> */}
      </section>
    </div>
  );
};

export default Home;
