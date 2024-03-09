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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { requirePropFactory } from '@mui/material';
import logo from '../images/logo2.jpeg'
import { clearAuthData } from '../redux/reducer/authReducer';
import LiveAttend from '../components/LiveAttend';
import Myclasses from './adminScreen/Myclasses';


function HomeScreen() {
  const [qrData, setQRData] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [userData, setUserData] = useState({});
  

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector(state => state.data);

  const logout = () => {
    dispatch(clearAuthData());
    navigation('/signup')
  }

  const [alignment, setAlignment] = React.useState('Home');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const data = useSelector(state => state);
  console.log(data)

  useEffect(() => {
    setUserData(user);

  }, [])
  return (
    <>
      <div style={{ position: "relative" }}>
        <div className='sideBar'>
          <div style={{ justifyContent: "center", alignItems: "center", width: "100%", display: "flex" }}>

            <img src={logo} alt="React Image" className='logoImg' />
          </div>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            orientation="vertical"
            style={{ width: "100%", marginBottom: 10, }}
          >
            <ToggleButton value="Home" style={{ marginBottom: 10 }}>Home</ToggleButton>
            <ToggleButton value="My Classes" style={{ marginBottom: 10 }}>My Classes</ToggleButton>
            <ToggleButton value="Live" style={{ marginBottom: 10 }}>Live Attend</ToggleButton>
            <ToggleButton value="Profile" style={{ marginBottom: 10 }}>Profile</ToggleButton>
            <ToggleButton value="Logout" style={{ marginBottom: 10 }} onClick={logout}>Logout</ToggleButton>
            <LogoutButton redirectTo="/signup" />

          </ToggleButtonGroup>
        </div>

        <div className='header'>
          <div className='insideHeader'>
            <h1>{userData.firstName + " " + userData.lastName}</h1>
          </div>
        </div>
        <div className="qr-generator">



          {alignment == "Home" && (
            <GenerateQR />
          )}

          <LiveAttend />
          <Myclasses/>
          <br />
          <br />
        </div>
      </div>
    </>
  )
}

export default HomeScreen