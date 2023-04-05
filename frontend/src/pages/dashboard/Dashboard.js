import React from 'react';
import useRedirectLoggedOutEmployee from '../../customHooks/useRedirectLoggedOutEmployee';

const Dashboard = () => {
  useRedirectLoggedOutEmployee('/'); // redirect logged out employees to the home page
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
