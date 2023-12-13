import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const HomeScreen = () => {
  const cameraRef = useRef(null);

  const handleBarCodeRead = (event) => {
    // Handle the scanned QR code data here
    // console.log('Scanned data:', event.data);
    alert(event.data);
    // You can do whatever you want with the scanned data here
    // For example, set it in state, display it, or navigate based on the data
  };

  return (
    <View style={styles.container}>
      {/* <RNCamera
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
      </RNCamera> */}

      <QRCodeScanner
      onRead={({data})=>{alert(data)}}
      flashMode={RNCamera.Constants.FlashMode.torch}
      />

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
});

export default HomeScreen;