// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginFaculty } from '../redux/action/LoginAction';
// import { PostData } from '../utils/api';
// import { useNavigate } from 'react-router-dom';


// const LoginScreen = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigate();


//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleLogin = async () => {
//     try {
//       // Perform API call for authentication and get token
//       const { email, password } = formData;
//       const facultyData = await dispatch(loginFaculty({ email, password }))
//       console.log(facultyData.payload.success)
//       if (facultyData.payload.success && facultyData.payload.data.user) {
//         navigation('/', facultyData.payload.data)
//       }
//     } catch (error) {
//       console.error('Login failed:', error.message);
//     }
//   };
//   useEffect(() => {
//     const token = localStorage.getItem('facultyToken');
//     if (token) {
//       navigation('/')
//     }

//   }, [])

//   return (
//     <div>
//       <h2>Login</h2>
//       <form>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="button" onClick={handleLogin}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginScreen;







import React, { useState } from 'react';
import '../styles/LoginScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginFaculty } from '../redux/action/LoginAction';
import { PostData } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [userType, setUserType] = useState('teacher'); // Default to teacher login
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
    // Your async login logic goes here using await
    try {
      // Perform API call for authentication and get token
      const { email, password } = formData;
      // console.log(email,password)
      const facultyData = await dispatch(loginFaculty({ email, password,userType }))
      console.log(facultyData.payload.success)
      if (facultyData.payload.success && facultyData.payload.data.user) {
        navigation('/', facultyData.payload.data)
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-container">
      <div className='login_main'>
        <h1>Please Login to Continue</h1>
      <div className="user-type-selection">
        <div
          className={`user-type-icon ${userType === 'teacher' ? 'active' : ''}`}
          onClick={() => handleUserType('teacher')}
        >
          Teacher
        </div>
        <div
          className={`user-type-icon ${userType === 'admin' ? 'active' : ''}`}
          onClick={() => handleUserType('admin')}
        >
          Admin
        </div>
      </div>
      <form>
        <div>
          <label className='label_login'>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className='label_login'>Password:</label>
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
    </div>
  );
};

export default LoginScreen;