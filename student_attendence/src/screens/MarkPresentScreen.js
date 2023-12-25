import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet ,TouchableOpacity } from 'react-native';

const MarkPresentScreen = ({ route, navigation }) => {
  const { subject } = route.params; // Assuming subject is passed through navigation
  const [attendancePercentage, setAttendancePercentage] = useState(null);

  // Assume there's a function to fetch attendance from the backend
  const fetchAttendance = async () => {

    setAttendancePercentage(75); // Replace this with your backend logic
  };
  const goToMyAttendance = () => {
    navigation.navigate('MyAttendance'); // Navigate to MyAttendance screen
  };

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.checkmarkContainer}>
        {/* Big correct sign */}
        <Text style={styles.checkmark}>✓</Text>
        {/* Bold text "Marked present!" */}
        <Text style={styles.markedPresent}>Marked present!</Text>
      </View>
      {/* Subject field */}
      <Text style={styles.subjectText}>Subject: {subject}</Text>
      {/* Current attendance percentage */}
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



