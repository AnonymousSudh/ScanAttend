import React, { useState } from 'react';
import '../styles/SignUp.css'; // Your CSS file for styling
import { useDispatch } from 'react-redux';
import { createFaculty } from '../redux/action/LoginAction';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const SignUpScreen = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
    });

    const [showPassword, setShowPassword] = React.useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = async (e) => {
        console.log(e)
        console.log("formData",formData)
        e.preventDefault();
        try {
            formData.type='faculty'
            const data = await dispatch(createFaculty(formData));
            if (data.payload.error) {
                alert(data.payload.error);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    password: '',
                });
                return;
            }
            navigate('/login');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                password: '',
            });
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className='formDiv'>
                <TextField
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={{ marginBottom: '15px' }}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={{ marginBottom: '15px' }}

                />
                <TextField
                    label="Email"
                    variant="outlined"
                    // type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ marginBottom: '15px' }}

                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={{ marginBottom: '15px' }}

                />
                {/* <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end" style={{ width: '10px', height: '5px' }} >
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                /> */}
                <TextField
                    label="Mobile"
                    variant="outlined"
                    className='hhhh'
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    style={{ marginBottom: '15px' }}

                />
                <button type="submit">Sign Up</button>
                <h6>Or</h6>
                <button onClick={() => {

                    navigate('/login')
                    }}>Login</button>
            </form>
        </div>
    );
};

export default SignUpScreen;    