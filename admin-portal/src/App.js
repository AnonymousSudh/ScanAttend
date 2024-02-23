import React from 'react'
import HomeScreen from "./screens/HomeScreen"
import SignUpScreen from './screens/SignUpScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import AdminHome from './screens/adminScreen/AdminHome'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";

const isAuthenticated = false;


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* {isAuthenticated?{}:<LoginScreen/>} */}
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/' element={<HomeScreen />} />
      <Route path='/signup' element={<SignUpScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path='/AdminHome' element={<AdminHome />} />
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App