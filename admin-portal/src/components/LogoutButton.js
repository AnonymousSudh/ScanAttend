import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAuthData } from '../redux/reducer/authReducer';
import { useNavigate } from 'react-router-dom';

const LogoutButton = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigate();

    const handleLogout = () => {
        dispatch(clearAuthData());
        navigation(props.redirectTo || '/signup')
        // Redirect or perform any other necessary actions after logout
    };

    return (
        <div style={{ justifyContent: 'center', alignItems: "center", display: "flex" }}>
            <button onClick={handleLogout} >
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;