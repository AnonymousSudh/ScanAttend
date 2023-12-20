import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
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
    console.log(dataString)
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




  // const handleScan = async (event) => {
  //   if (!scanned) {
  //     setScanned(true);
  //     try {
  //       // Do something with the scanned data (example: log it)
  //       console.log('Scanned data:', event.data);
  //       setScannedData(event.data);
  //     } catch (error) {
  //       console.error('Error handling scanned data:', error);
  //     }
  //   }
  // };

  // // Function to handle when the scanner is resumed
  // const handleScanResume = () => {
  //   setScanned(false);
  // };
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
      {/* <QRCodeScanner
        onRead={handleScan}
        reactivate={true}
        reactivateTimeout={2000}
        showMarker={true} /// Toggle the marker visibility
        containerStyle={styles.scannerContainer}
        markerStyle={styles.marker}
        cameraStyle={styles.camera}
      /> */}
      <View style={styles.container}>

        {visible && (
          <View style={styles.dataContainer}>
            <Text>course: {QRdata.course}</Text>
            <Text>subject: {QRdata.subject}</Text>
            <Text>division: {QRdata.division}</Text>
            <Text>semester: {QRdata.semester}</Text>
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