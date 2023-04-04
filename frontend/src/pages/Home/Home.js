import React from 'react';
import { FaToolbox } from 'react-icons/fa'; // add first 2 characters after the forward slash
import { Link } from 'react-router-dom';
import './Home.scss';
// import heroImg from '../../assets/inv-img.png';

const Home = () => {
  return (
    <div className="home">
      {/*class names like --flex-between utility classes to make my life easier, see index.css*/}
      <nav className="container --flex-between">
        <div className="logo">
          <FaToolbox size={35} />
        </div>
        <ul className="home-links">
          <li>
            <button className="--btn --btn-primary">
              <Link to="/login">Login</Link>
            </button>
          </li>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/dashboard">Dashboard</Link>
            </button>
          </li>
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

// create another component
// the number and text are different
const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
