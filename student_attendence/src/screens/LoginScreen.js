import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper'; // 
import { useSelector, useDispatch } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { loginStudent } from '../redux/action/authAction';
 
const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [deviceAddress, setDeviceAddress] = useState(null);
  const dispatch = useDispatch();
  const selectorData = useSelector((state) => state.auth);
  const getDeviceID = async () => setDeviceAddress(await DeviceInfo.getUniqueId());

  const handleLogin = async () => {
    // Handle login logic here
    console.log('Username:', userName);
    console.log('Password:', password);
    console.log(deviceAddress)
    const data = await dispatch(loginStudent({ userName, password, deviceAddress }))
    console.log("-------------")
    console.log(data)
    if (data.payload.success) {
      console.log("selectorData",selectorData);
      ToastAndroid.showWithGravity(
        `${data.payload.msg}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      ToastAndroid.showWithGravity(
        `${data.payload.error}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    // console.log(data)
  };
  useEffect(() => {
    getDeviceID();
  }, [])

  return (
    <View style={styles.container}>
      <PaperTextInput
        mode="outlined"
        label="Username"
        value={userName}
        right={<PaperTextInput.Affix text="" />}
        onChangeText={(text) => setUserName(text)}
        style={styles.input}
      />
      <PaperTextInput
        mode="outlined"
        label="Password"
        value={password}
        right={<PaperTextInput.Affix text="" />}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <PaperButton mode="contained" onPress={handleLogin} style={styles.loginButton}>
        Login
      </PaperButton>
      <PaperButton onPress={() => navigation.navigate('Signup')} style={styles.createAccountButton}>
        Create a new account
      </PaperButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 10,
  },
  createAccountButton: {
    marginTop: 20,
  },
});

export default LoginScreen;