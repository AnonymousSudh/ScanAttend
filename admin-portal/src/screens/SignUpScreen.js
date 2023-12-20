import React, { useState } from 'react';
import '../styles/SignUp.css'; // Your CSS file for styling
import { PostData } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createFaculty } from '../redux/action/LoginAction';

const SignUpScreen = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        try {
            console.log(formData)
            const data = await dispatch(createFaculty(formData))
            if (data.payload.error) {
                console.log("payload ")
                alert(data.payload.error);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    password: '',
                });
                return
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
        // You can add your API calls or form submission logic here
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>firstName:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </div> <div className="form-group">
                    <label>lastName:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" >Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpScreen;