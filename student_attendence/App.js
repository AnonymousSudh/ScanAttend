import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import {store} from './src/redux/store'
import SignupScreen from './src/screens/SignUpScreen'
// import ProfileScreen from './src/screens/ProfileScreen'
import HomeScreen from './src/screens/HomeScreen'

const App = () => {
  return (
    <Provider store={store}>

      {/* <ProfileScreen/> */}
      {/* <SignupScreen/> */}
      <HomeScreen/>
    {/* // <SignupScreen/>
    // <View>
    //   <Text>App</Text>
    // </View> */}
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})