import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton, Text } from 'react-native-paper';  
import { useSelector, useDispatch } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { loginStudent } from '../redux/action/authAction';
 
const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('sudhanshu');
  const [password, setPassword] = useState('1111');
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
      console.log("selectorData", selectorData);
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
      <TouchableOpacity style={{
        width: "100%",
        // borderWidth: 1,
        // borderColor: "red", 
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderRadius: 40,
        backgroundColor: "#674FA3"
      }}
        onPress={handleLogin}
      >
        <Text style={{ color: "white", fontWeight: 'bold' }}>Login</Text>
      </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: "red"
  },
  createAccountButton: {
    marginTop: 20,
  },
});

export default LoginScreen;