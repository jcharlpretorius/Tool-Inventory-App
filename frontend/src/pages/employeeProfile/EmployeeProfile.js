import React, { useEffect, useState } from 'react';
import './EmployeeProfile.scss';
import useRedirectLoggedOutEmployee from '../../customHooks/useRedirectLoggedOutEmployee';
import { getLoggedInEmployee } from '../../services/authService';
import {
  SET_EMPLOYEE,
  SET_FIRSTNAME,
} from '../../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { SpinnerImg } from '../../components/loader/Loader';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';

const EmployeeProfile = () => {
  useRedirectLoggedOutEmployee('/');
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getEmployeeData() {
      const employeeData = await getLoggedInEmployee();
      console.log(employeeData);

      setProfile(employeeData);
      setIsLoading(false);
      // store the employee data in the state
      dispatch(SET_EMPLOYEE(employeeData));
      dispatch(SET_FIRSTNAME(employeeData.firstName));
    }
    getEmployeeData(); // call the above function once
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          // why does this sometimes break?
          <p>Error! Reload the page</p>
        ) : (
          <Card cardClass={'card --flex-dir-column'}>
            <span className="profile-data">
              <p>
                <b>First Name: </b> {profile?.firstName}
              </p>
              <p>
                <b>Middle Initial: </b> {profile?.minit}
              </p>
              <p>
                <b>Last Name: </b> {profile?.lastName}
              </p>
              <p>
                <b>Phone Number: </b> {profile?.phoneNumber}
              </p>
              <p>
                <b>Email: </b> {profile?.email}
              </p>
              <p>
                <b>Job Role: </b> {profile?.role}
              </p>
              <div>
                <Link to="/edit-employee-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default EmployeeProfile;
