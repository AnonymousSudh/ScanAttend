import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button, Picker, Alert } from 'react-native';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';
import { fetchData, postData } from "../utils/api"
import DeviceInfo from 'react-native-device-info';

// import InputField from '../components/InputField';



const SignupScreen = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [programName, setProgramName] = useState('');
  const [programSemester, setProgramSemester] = useState('');
  const [authToken, setAuthToken] = useState('');

  const [deviceId, setDeviceID] = useState(null);

  const getDeviceID = async () => {
    setDeviceID(await DeviceInfo.getUniqueId())
    // console.log(deviceId)
  }


  const checkUserName = () => {
    console.log("hello")
  };

  const handleSignup = async () => {
    try {
      const signupData = {
        userName,
        firstName,
        lastName,
        mobileNumber,
        rollNumber,
        password,
        programName,
        programSemester,
        authToken,
      };

      const result = await postData('create', signupData);
      console.log("result", result)
    } catch (error) {
      console.log(error)
      throw error;
    }
  };
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log("hello")
        func.apply(this, args);
      }, delay);
    };
  };

  // Function to be debounced
  const handleInputChange = (text) => {
    setUserName(text);
  };
  const debouncedInputChange = debounce(handleInputChange, 1000);
  useEffect(() => {

    getDeviceID()
  }, [])


  const handlePhotoUpload = () => {
    // Implement logic for photo upload
    console.log("fghjk")
  };

  return (
    <View>
      {/* <TextInput
        placeholder="Username"
        value={userName}
        onKeyPress={()=>handlePhotoUpload()}
        onChangeText={text => setUserName(text)}
        // onChangeText={text =>  debouncedInputChange(text)}
      /> */}
      <InputField placeholder={"hello"} onChangeText={handlePhotoUpload}/>

      {/* <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      /> */}
      {/* Other input fields for lastName, mobileNumber, rollNumber, password */}





      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Change the background color as needed
  },
  formContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Glassmorphism effect with transparency
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Box shadow for glass effect
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent input fields
  },
});

export default SignupScreen;