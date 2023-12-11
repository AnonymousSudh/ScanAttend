import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';
import {  fetchData, postData } from "../utils/api"

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [courseID, setCourseID] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSignup = async () => {
    try {
      const newData = {
        userName: 'sudhanshu_maurya',
        firstName: 'suchita',
        lastName: 'chaubey',
        mobileNumber: 1234567890,
        deviceAddress: '123 Main St',
        rollNumber: 'RN12df3',
        password: 'hasdfdfdfdford', // Ensure to use a hashed password
        programName: 'Computer Science',
        programSemester: 'Spffdfring',
        authToken: 'sfdffomeAuthToken',
      };
      const result = await postData('create', newData); // this line takes time
      console.log("result", result)

    } catch (error) {
      console.log("error", error)
      throw error
    }



  };

  const handlePhotoUpload = () => {
    // Implement logic for photo upload
  };

  return (
    <View style={styles.container}>
      <Text>Signup</Text>
      <InputField placeholder="Name" onChangeText={setName} />
      <InputField placeholder="Username" onChangeText={setUsername} />
      <InputField placeholder="Password" onChangeText={setPassword} secureTextEntry />
      <InputField placeholder="Roll No" onChangeText={setRollNo} />
      <Dropdown
        items={[
          { label: 'Course A', value: 'courseA' },
          { label: 'Course B', value: 'courseB' },
          // Add more courses as needed
        ]}
        onValueChange={(itemValue) => setCourseID(itemValue)}
      />
      <TouchableOpacity onPress={handlePhotoUpload}>
        <Text>Upload Photo</Text>
      </TouchableOpacity>
      {/* {photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />} */}
      <TouchableOpacity onPress={handleSignup}>
        <Text>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignupScreen;