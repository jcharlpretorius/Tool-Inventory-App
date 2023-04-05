import React from 'react';
import loaderGif from '../../assets/loader.gif';
import ReactDOM from 'react-dom';
import './Loader.scss';

// full screen loader
const Loader = () => {
  // we need portal to display it properly on the whole screen
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderGif} alt="Loading..." />
      </div>
    </div>,
    document.getElementById('loader')
  );
};

// just the loader, not the whole screen
export const SpinnerImg = () => {
  return (
    // centered horizontally and verticaly
    <div className="--center-all">
      <img src={loaderGif} alt="Loading..." />
    </div>
  );
};

export default Loader;
