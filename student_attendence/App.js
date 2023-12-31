import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import SplashScreen from './src/screens/SplashScreen';
import { useSelector } from 'react-redux';


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const data = useSelector((state) => state.auth);
    const studentId = data.studentId || false;
    console.log(studentId)

    return (
        <NavigationContainer>
            {studentId ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>


    )
}

export default App
