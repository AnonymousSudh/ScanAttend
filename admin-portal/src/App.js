import React from 'react'
import HomeScreen from "./screens/HomeScreen"
import SignUpScreen from './screens/SignUpScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
// localStorage.getItem('faculty')

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/login' element={<LoginScreen/>}/>
    <Route path='/' element={<HomeScreen/>}/> 
    <Route path='/signup' element={<SignUpScreen/>}/>
    <Route path='/profile' element={<ProfileScreen/>}/>
    </>
  )
);

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App