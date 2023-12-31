import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, ToastAndroid } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { postData } from '../utils/api';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const [QRdata, setQRData] = useState({});
  const [visible, setVisible] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const studentData = useSelector(state => state.auth);
  console.log(" User data ", studentData.studentId)
  var qrInfo = {};

  const handleBarCodeRead = (event) => {

    const dataString = event.data;
    console.log(dataString)
    const keyValuePairs = dataString.split(',').map(pair => pair.split(':'));
    console.log("keyValuePairs", keyValuePairs)
    keyValuePairs.forEach(([key, value]) => {
      qrInfo[key.trim()] = value.trim();
    });
    // console.log("------------")
    console.log(qrInfo)
    setQRData(qrInfo)
    setVisible(true);
  };

  const markAttendance = async () => {
    try {

      console.log("-------- Data after mark attendance ----")
      console.log(QRdata);
      const { course, courseId, division, divisionId, faculty, facultyId, subject, subjectId } = QRdata;
      const studentId = studentData.studentId;
      console.log("----------")
      console.log("studentData",studentData)
      console.log("studentId",studentId)
      const lectureData = { ...QRdata, studentId }
      console.log("lectureData",lectureData)
      const response = await postData('markAttendance', lectureData); // student attendance marked
      console.log("response after marked present ")
      console.log(response);
      if (response.success) {
        console.log("---------")
        const lectureId = response.data.id;
        console.log(lectureId)
        // const attendData = await postData('getattendancePercentage', { lectureId, studentId, courseId, subjectId, facultyId, divisionId });
        // console.log("attendData",attendData);

        navigation.navigate('MarkAttendance', {...QRdata, lectureId, studentId, courseId, subjectId, facultyId, divisionId })
      } else {
        console.log(response)
        ToastAndroid.showWithGravity(
          `${response.msg}`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
      console.log(QRdata)
    } catch (error) {
      console.log("error", error)
    }


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
        captureAudio={false}
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
            <Text style={styles.blackBoldText}>course: {QRdata.course}</Text>
            <Text style={styles.blackBoldText}>subject: {QRdata.subject}</Text>
            <Text style={styles.blackBoldText}>division: {QRdata.division}</Text>
            <Text style={styles.blackBoldText}>semester: {QRdata.semester}</Text>
            <Text style={styles.blackBoldText}>Faculty: {QRdata.faculty}</Text>
          </View>
        )}
        {visible && (
          <View style={styles.buttonContainer}>
            <Button title="Mark Present" onPress={markAttendance} />
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
  blackBoldText: {
    color: 'black',
    // fontWeight: 'bolder'
  }
});

export default HomeScreen;