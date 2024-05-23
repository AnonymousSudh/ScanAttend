import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'qrcode.react';
import LogoutButton from '../components/LogoutButton';
import '../styles/Home.css'
import AddSubject from '../components/AddSubject';
import GenerateQR from '../components/GenerateQR';
import AddDivision from '../components/AddDivision';
import AddCourse from '../components/AddCourse';
import AssignSubjectsToFaculty from './adminScreen/AssignSubjectsToFaculty';
import SideNavBar from '../components/SideNavBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { requirePropFactory } from '@mui/material';
import logo from '../images/logo2.jpeg'
import { clearAuthData } from '../redux/reducer/authReducer';
import LiveAttend from '../components/LiveAttend';
import Myclasses from './adminScreen/Myclasses';
import LastClass from './LastClass';
import { commonStyle } from '../styles/CommonStyle'

function HomeScreen() {
  const [tabValue, setTabValue] = useState('My Classes');
  const [userData, setUserData] = useState({});

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector(state => state);
  console.log(user.auth.data, "user");

  const logout = () => {
    dispatch(clearAuthData());
    navigation('/signup');
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setUserData(user.auth.data);
  }, [user]);

  return (
    <>
      <div style={{ backgroundColor: '#F5F7F9', display: 'flex' }}>
        <div style={{}}>
          <div className='sideBar'>
            <div style={{ justifyContent: "center", alignItems: "center", width: "100%", display: "flex" }}>
              <img src={logo} alt="React Image" className='logoImg' />
            </div>
            <Tabs
              className="tabs"
              orientation="vertical"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Navigation Tabs"
              indicatorColor="secondary"
              textColor="secondary"
              style={{ width: "100%" }}
            >
              <Tab value="Home" label="Home" />
              <Tab value="My Classes" label="My Classes" />
              <Tab value="Live" label="Live Attend" />
              <Tab value="Last Class" label="Last Class" />
              <Tab value="Add Subject" label="Add Subject" />
              <Tab value="Logout" label="Logout" onClick={logout} />
            </Tabs>
          </div>
        </div>
        <div className="content" style={{ flexGrow: 1 }}>
          <div className='header'>
            <div className='insideHeader'>
              <h1>{userData.firstName + " " + userData.lastName}</h1>
            </div>
          </div>
          {tabValue === "Home" && <GenerateQR />}
          {tabValue === "My Classes" && <Myclasses />}
          {tabValue === "Live" && <LiveAttend />}
          {tabValue === "Last Class" && <LastClass />}
          {tabValue === "Add Subject" && <AddSubject />}
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
