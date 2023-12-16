import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

import ProfileScreen from './src/screens/ProfileScreen';
const isAuthenticated = true;
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </Provider>
  )
}

export default App
