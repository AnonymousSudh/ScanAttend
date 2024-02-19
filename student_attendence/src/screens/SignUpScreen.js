import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper'; // 
import { useSelector, useDispatch } from 'react-redux';
import { createStudent } from '../redux/action/authAction'
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState('');
  const [deviceAddress, setDeviceID] = useState(null);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const getDeviceID = async () => setDeviceID(await DeviceInfo.getUniqueId());

  const handleSignUp = async () => {
    if (!userName || !rollNumber || !password) {
      ToastAndroid.showWithGravity(
        'Please fill in all required fields',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      const studentData = { userName, fullName, mobileNumber, rollNumber, password, course, deviceAddress }
      console.log(studentData)
      const data = await dispatch(createStudent(studentData));
      console.log(data.payload);
      if (data.payload.success) {
        ToastAndroid.showWithGravity(
          `${data.payload.msg}`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        navigation.navigate('Login')
      } else {
        ToastAndroid.showWithGravity(
          `${data.payload.error}`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }

  };


  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return function (...args) {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       console.log("hello")
  //       func.apply(this, args);
  //     }, delay);
  //   };
  // };

  // // Function to be debounced
  // const handleInputChange = (text) => {
  //   setUserName(text);
  // };
  // const debouncedInputChange = debounce(handleInputChange, 1000);

  // const handlePhotoUpload = () => {
  //   // Implement logic for photo upload
  //   console.log("fghjk")
  // };
  useEffect(() => {
    getDeviceID();
  }, [])

  return (
    <ScrollView>
      <Text style={styles.signUpText}>SignUp</Text>
      <View style={styles.signUpContainer}>
        <View style={styles.inputContainer}>
          <PaperTextInput
            mode="outlined"
            label="Username"
            placeholder="Enter username"
            value={userName}
            onChangeText={text => setUserName(text)}
            right={<PaperTextInput.Affix text="" />}
            style={styles.outlineText}
          />
        </View>

        <View style={styles.inputContainer}>

          <PaperTextInput
            placeholder="Enter full name"
            label="Full Name"
            value={fullName}
            onChangeText={text => setFullName(text)}
            mode="outlined"
            right={<PaperTextInput.Affix text="" />}
            style={styles.outlineText}
          />
        </View>

        <View style={styles.inputContainer}>

          <PaperTextInput
            mode="outlined"
            label="Mobile Number"
            placeholder="Enter mobile number"
            value={mobileNumber}
            keyboardType='number-pad'
            onChangeText={text => setMobileNumber(text)}
            right={<PaperTextInput.Affix text="" />}
            style={styles.outlineText}
          />
        </View>

        <View style={styles.inputContainer}>
          <PaperTextInput
            mode="outlined"
            label="Roll Number"
            placeholder="Enter roll number"
            right={<PaperTextInput.Affix text="" />}
            style={styles.outlineText}
            value={rollNumber}
            onChangeText={text => setRollNumber(text)}
          />
        </View>


        <View style={styles.inputContainer}>

          <PaperTextInput
            placeholder="Enter password"
            label="Password"
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
            mode="outlined"
            right={<PaperTextInput.Affix text="" />}
            style={styles.outlineText}
          />
        </View>

        <View style={styles.inputContainer}>

          <PaperTextInput
            placeholder="Enter course"
            label="Course"
            value={course}
            onChangeText={text => setCourse(text)}
            mode="outlined"
            right={<PaperTextInput.Affix text="" />}
            style={styles.outlineText}
          />
        </View>

        <PaperButton mode="contained" style={styles.button} onPress={handleSignUp}>
          Sign Up
        </PaperButton>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Login')
        }} >
          <Text style={styles.signInText}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signUpText: {
    fontWeight: 'bold',
    padding: 10,
    fontSize: 18,
  },

  signUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  inputContainer: {
    // borderColor:"red",
    // borderWidth:1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpinput: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
  signInText: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
  },
  outlineText: {
    width: '80%',
    marginVertical: 10,
    backgroundColor: 'transparent', // Set the background color of the input field
  },
});

export default SignupScreen;