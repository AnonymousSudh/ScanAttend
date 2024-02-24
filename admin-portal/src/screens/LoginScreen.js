import React, { useState } from 'react';
import '../styles/LoginScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginFaculty } from '../redux/action/LoginAction';
import { PostData } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [userType, setUserType] = useState('faculty'); // Default to teacher login
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigation = useNavigate();


  const handleUserType = (type) => {
    setUserType(type);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Perform API call for authentication and get token
      const { email, password } = formData;
      // console.log(email,password)
      const facultyData = await dispatch(loginFaculty({ email, password, userType }))
      console.log(facultyData.payload.success)
      console.log("login data", facultyData.payload)
      if (facultyData.payload.success && facultyData.payload.data.user) {
        if (facultyData.payload.data.user.type == 'faculty') {
          navigation('/', facultyData.payload.data)
          return
        }
        navigation('/AdminHome', facultyData.payload.data)
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <>
      <div className='mainDivLogin'>

        <div className="glass-container">
          <div className='loginHeading'>

            <h1 style={{color:"white"}}>Login As {userType.toUpperCase()}</h1>
          </div>
          <div className="glass-content">

            <div className="login-container">
              <div className="user-type-selection">
                <div
                  className={`user-type-icon ${userType === 'faculty' ? 'active' : ''}`}
                  onClick={() => handleUserType('faculty')}
                >
                  Faculty
                </div>
                <div
                  className={`user-type-icon ${userType === 'admin' ? 'active' : ''}`}
                  onClick={() => handleUserType('admin')}
                >
                  Admin
                </div>
              </div>
              <form style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <div className='fieldDiv'>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className='signupInput'
                  // style={{"fontSize":"20px"}}
                  />
                </div>
                <div style={{ paddingBottom: "10px" }}>
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className='signupInput'

                  />
                </div>
                <button type="button" onClick={handleLogin} className='loginButton'>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;