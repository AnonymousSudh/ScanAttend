import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Button, StyleSheet, ToastAndroid, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { postData } from '../utils/api';
import { useSelector } from 'react-redux';
import { Avatar, Card, Text } from 'react-native-paper';


const HomeScreen = () => {
  const [QRdata, setQRData] = useState({});
  const [visible, setVisible] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const studentData = useSelector(state => state.auth);
  console.log(" Student data ", studentData)
  var qrInfo = {};

  const handleBarCodeRead = (event) => {
    console.log(scanCount)
    if (scanCount == 0) {
      setScanCount(scanCount + 1);
      const dataString = event.data;
      console.log(dataString)
      const keyValuePairs = dataString.split(',').map(pair => pair.split(':'));
      // console.log("keyValuePairs", keyValuePairs)
      keyValuePairs.forEach(([key, value]) => {
        qrInfo[key.trim()] = value?.trim();
      });
      // console.log("------------")
      console.log(qrInfo)
      if (qrInfo.course != studentData.course) {
        Alert.alert('Invalid QR', 'Please Scan Your Course QR', [
          {
            text: 'Cancel',
            onPress: () => { setScanCount(0) },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => { setScanCount(0) }
          },
        ]);
        return
      }
      setQRData(qrInfo)
      setVisible(true);
      setTimeout(() => {
        setScanCount(0)
      }, 3000);

    }

  };

  const markAttendance = async () => {
    try {

      console.log("-------- Data after mark attendance ----")
      console.log(QRdata);
      const { course, courseId, division, divisionId, faculty, facultyId, subject, subjectId } = QRdata;
      const studentId = studentData.studentId;
      const lectureData = { ...QRdata, studentId }
      console.log("lectureData", lectureData)
      const response = await postData('markAttendance', lectureData);
      console.log("response after marked present ")
      console.log(response);
      if (response.success) {
        // console.log("---------")
        const lectureId = response.data.id;
        console.log(lectureId)
        // const attendData = await postData('getattendancePercentage', { lectureId, studentId, courseId, subjectId, facultyId, divisionId });
        // console.log("attendData",attendData);

        navigation.navigate('MarkAttendance', { ...QRdata, lectureId, studentId, courseId, subjectId, facultyId, divisionId })
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
      console.log("error  at markAttendance", error)
    }


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



          <Card>
            <Card.Content style={{ width: "90%" }}>

              <View style={{ flexDirection: "row", alignItems: "center" }}>

                <Text style={styles.blackBoldText}>Course: </Text>
                <Text style={styles.resultText}>{QRdata.course}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.blackBoldText}>Semester: </Text>
                <Text style={styles.resultText}>{QRdata.semester}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.blackBoldText}>Division: </Text>
                <Text style={styles.resultText}>{QRdata.division}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.blackBoldText}>Subject: </Text>
                <Text style={styles.resultText}>{QRdata.subject}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.blackBoldText}>Faculty: </Text>
                <Text style={styles.resultText}>{QRdata.faculty}</Text>
              </View>
            </Card.Content>
          </Card>
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
    marginTop: 30
  },
  blackBoldText: {
    color: 'black',
    fontWeight: 'bold'
  },
  resultText: {
    fontSize: 15
  }
});

export default HomeScreen;




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