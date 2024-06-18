import React from 'react';
import { View, StyleSheet ,Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MarkPresentScreen from '../screens/MarkPresentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import MyAttendance from '../screens/MyAttendance';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{
        headerShown: false}}/>
      <Stack.Screen name="MarkAttendance" component={MarkPresentScreen} 
      options={{headerShown: true}} />
      <Stack.Screen name="Attendance Sheet" component={AttendanceScreen} options={{headerShown: true}} />
      <Stack.Screen name="MyAttendance" component={MyAttendance} options={{headerShown: true}} />
      
      
    </Stack.Navigator>
  );
};
export default function MyComponent() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route }) => {
            navigation.navigate(route.name);
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

             return label;
            }}
          />
        )}
      >
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{
          // headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => {
            return <Image source={require('../assets/images/home.png')} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => {
            return <Image source={require('../assets/images/profileUser.png')} />;
          },
        }}
      />
        {/* <Tab.Screen name="MarkPresent" component={MarkPresentScreen} /> */}
    </Tab.Navigator>
  );
}



// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { BottomNavigation, Text } from 'react-native-paper';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// import HomeScreen from '../screens/HomeScreen';
// import MarkPresentScreen from '../screens/MarkPresentScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import AttendanceScreen from '../screens/AttendanceScreen';

// const Tab = createBottomTabNavigator();

// const AppNavigator = () => {
//   const HomeRoute = () => <HomeScreen />;
//   const MarkPresentRoute = () => <MarkPresentScreen />;
//   const ProfileRoute = () => <ProfileScreen />;
//   const AttendanceRoute = () => <AttendanceScreen />;

//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'home', title: 'Home', icon: 'home' },
//     { key: 'markPresent', title: 'Mark Present', icon: 'book' },
//     { key: 'profile', title: 'Profile', icon: 'account' },
//     { key: 'attendance', title: 'Attendance', icon: 'clipboard-list' },
//   ]);

//   const renderScene = BottomNavigation.SceneMap({
//     home: HomeRoute,
//     markPresent: MarkPresentRoute,
//     profile: ProfileRoute,
//     attendance: AttendanceRoute,
//   });

//   return (
//     <SafeAreaProvider>
//       <BottomNavigation
//         navigationState={{ index, routes }}
//         onIndexChange={setIndex}
//         renderScene={renderScene}
//       />
//     </SafeAreaProvider>
//   );
// };

// export default AppNavigator;









// pre existing code 



// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from '../screens/HomeScreen';
// import MarkPresentScreen from '../screens/MarkPresentScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import AttendanceScreen from '../screens/AttendanceScreen';

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//     return (
//         <Stack.Navigator initialRouteName="Home"  screenOptions={{
//             headerShown: false
//           }}>
//             <Stack.Screen name="Home" component={HomeScreen}  />
//             <Stack.Screen name="MarkPresent" component={MarkPresentScreen} />
//             <Stack.Screen name="Profile" component={ProfileScreen} />
//             <Stack.Screen name="Attendance" component={AttendanceScreen} />
        
//         </Stack.Navigator>
//     );
// };

// export default AppNavigator;

