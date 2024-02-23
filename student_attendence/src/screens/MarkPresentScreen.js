import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { postData } from '../utils/api';
import { useNavigation } from '@react-navigation/native';

const MarkPresentScreen = ({ route, navigation }) => {
  const [attendancePercentage, setAttendancePercentage] = useState(null);
  const { lectureId, studentId, courseId, subjectId, facultyId, divisionId,subject,semester} = route.params;
  console.log(route.params)
  const navigationn = useNavigation();


  const fetchAttendance = async () => {
    try{
    console.log("useEffect running")
    const attendData = await postData('getattendancePercentageOfSubjectSubject', { lectureId, studentId, courseId, subjectId, facultyId, divisionId });
    console.log("attendData",attendData)
    setAttendancePercentage(Math.round(attendData.data.attendancePercentage)); // Replace this with your backend logic
    }catch(error){
      console.log(error)
    }
  };
  const goToMyAttendance = () => {
    navigationn.navigate('Attendance Sheet',{
      studentId,courseId,divisionId,semester
    }); // Navigate to MyAttendance screen
  };

  useEffect(() => {
    fetchAttendance();

  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.checkmarkContainer}>
        <Text style={styles.checkmark}>✓</Text>
        <Text style={styles.markedPresent}>Marked present!</Text>
      </View>
      <Text style={styles.subjectText}>Subject: {subject}</Text>
      <Text style={styles.attendanceText}>
        Current Attendance: {attendancePercentage ? `${attendancePercentage}%` : 'Loading...'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={goToMyAttendance}>
        <Text style={styles.buttonText}>My Attendance</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MarkPresentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  checkmarkContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 80,
  },
  markedPresent: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subjectText: {
    fontSize: 16,
    marginBottom: 10,
  },
  attendanceText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



