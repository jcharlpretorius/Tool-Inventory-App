import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEmployee } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import './EmployeeProfile.scss';
import { updateEmployeeProfile } from '../../services/authService';
import { toast } from 'react-toastify';

const EditEmployeeProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const employee = useSelector(selectEmployee);

  // when the page refreshed, just return to their profile page (the state is lost )
  const { employeeId } = employee;

  useEffect(() => {
    if (!employeeId) {
      navigate('/employee-profile');
    }
  }, [employeeId, navigate]);

  // MUST use optional chaining here, incase the user refreshed the webpage and the state is refreshed
  const initialState = {
    employeeId: employee?.employeeId,
    firstName: employee?.firstName,
    minit: employee?.minit,
    lastName: employee?.lastName,
    email: employee?.email,
    phoneNumber: employee?.phoneNumber,
    role: employee?.role,
  };

  const [profile, setProfile] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const formData = {
        employeeId: profile.employeeId,
        firstName: profile.firstName,
        minit: profile.minit,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        role: profile.role,
      };
      const data = await updateEmployeeProfile(formData);
      // toast.success('Employee profile updated');
      navigate('/employee-profile');
      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}
      <Card cardClass={'card --flex-dir-column'}>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Employee ID: </label>
              <input
                type="text"
                name="employeeId"
                value={profile?.employeeId}
                disabled
              />
              <br />
              <code>Employee ID cannot be changed</code>
            </p>
            <p>
              <label>First Name: </label>
              <input
                type="text"
                name="firstName"
                value={profile?.firstName}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Middle Initial: </label>
              <input
                type="text"
                name="minit"
                value={profile?.minit}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Last Name: </label>
              <input
                type="text"
                name="lastName"
                value={profile?.lastName}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Phone Number: </label>
              <input
                type="text"
                name="phoneNumber"
                value={profile?.phoneNumber}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email: </label>
              <input
                type="text"
                name="email"
                value={profile?.email}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Job Role: </label>
              <input type="text" name="role" value={profile?.role} disabled />
            </p>
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
    </div>
  );
};

export default EditEmployeeProfile;
