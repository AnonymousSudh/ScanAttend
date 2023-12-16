import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MarkPresentScreen from '../screens/MarkPresentScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home"  screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Home" component={HomeScreen}  />
            <Stack.Screen name="Profile" component={MarkPresentScreen} />
            <Stack.Screen name="Settings" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;

