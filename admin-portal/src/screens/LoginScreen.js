import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFaculty } from '../redux/action/LoginAction';
import { PostData } from '../utils/api';
import { useNavigate } from 'react-router-dom';


const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();


  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      // Perform API call for authentication and get token
      const { email, password } = formData;
      const facultyData = await dispatch(loginFaculty({ email, password }))
      console.log(facultyData.payload.success)
      if(facultyData.payload.success && facultyData.payload.data.user){
        navigation('/',facultyData.payload.data)
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('facultyToken');
    if (token) {
      navigation('/')
    }

  }, [])

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;