import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider,useSelector } from 'react-redux';
import {authStore} from './redux/store'

import App from './App';
// import SignUp from './screens/SignUp';
// import ProfileScreen from './screens/ProfileScreen';
// import HomeScreen from './screens/HomeScreen';
// import SignUpScreen from './screens/SignUpScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={authStore}>
    <App />
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

