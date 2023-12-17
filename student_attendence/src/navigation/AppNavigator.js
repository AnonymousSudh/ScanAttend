import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MarkPresentScreen from '../screens/MarkPresentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AttendanceScreen from '../screens/AttendanceScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home"  screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Home" component={HomeScreen}  />
            <Stack.Screen name="MarkPresent" component={MarkPresentScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Attendance" component={AttendanceScreen} />
        
        </Stack.Navigator>
    );
};

export default AppNavigator;

