import React, { useState,useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import SplashScreen from './src/screens/SplashScreen';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getStudentId = async () => {
    try {
      const studentId = await AsyncStorage.getItem('studentId');
      if (studentId) {
        console.log('studentId', studentId);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching studentId:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    getStudentId();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </Provider>

  )
}

export default App
