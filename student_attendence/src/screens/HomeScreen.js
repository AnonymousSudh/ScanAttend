import React, { useRef ,useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [QRdata, setQRData] = useState({});
  const [visible, setVisible] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  var qrInfo = {};

  const handleBarCodeRead = (event) => {
    const dataString = event.data;
    const keyValuePairs = dataString.split(',').map(pair => pair.split(':'));
    keyValuePairs.forEach(([key, value]) => {
      qrInfo[key.trim()] = value.trim();
    });
    setQRData(qrInfo)
    setVisible(true);

  };
  const markPresent = () => {
    // Handle marking present functionality here
    // This function will be called when "Mark Present" button is pressed
    console.log(QRdata)

    navigation.navigate('MarkPresent', QRdata)

    // Implement your logic for marking present
  };

  return (
    <View style={styles.container}>
      <View style={styles.camera}></View>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        onBarCodeRead={handleBarCodeRead}
        // onRead={({data})=>{alert(data)}}
        reactivate={true}
        reactivateTimeout={4000}
      >
        <Text style={styles.scanText}>Scan QR Code</Text>
      </RNCamera>

      <View style={styles.container}>
      
        {visible  && (
          <View style={styles.dataContainer}>
            <Text>Subject: {QRdata.subject}</Text>
            <Text>Semester: {QRdata.semester}</Text>
            <Text>Faculty: {QRdata.faculty}</Text>
          </View>
        )}
        {visible && (
          <View style={styles.buttonContainer}>
            <Button title="Mark Present" onPress={markPresent} />
          </View>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scanText: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    backgroundColor: '#eee',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  buttonContainer: {
    width: '80%',
  },
});

export default HomeScreen;