import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { postData } from '../utils/api';
import { Avatar, Button, Card, } from 'react-native-paper';
import CircularProgress from 'react-native-circular-progress-indicator';



const AttendanceScreen = ({ route }) => {
  console.log(route)
  console.log(route?.params)
  // {"courseId": "2", "divisionId": "11", "studentId": 1}
  const { courseId, divisionId, studentId, semester } = route?.params

  const getListOfAllSubjects = async () => {
    console.log("gyuf")
    const subjectList = await postData('getSubjectOfStudents', { courseId, divisionId, studentId, semester });
    console.log("gyuf")

    console.log("subjectList", subjectList)

  }

  getListOfAllSubjects()
  useEffect(() => {
  }, [])
  return (
    <View>
      <Text>AttendanceScreen</Text>
      <Card>
        <Card.Content>
          <View>

            <Text variant="titleLarge">Subject Name</Text>
            <Text variant="bodyMedium">Faculty Name</Text>
          </View>
          <View>

            <CircularProgress
              value={60}
              radius={120}
              duration={2000}
              progressValueColor={'#ecf0f1'}
              maxValue={200}
              title={'KM/H'}
              titleColor={'white'}
              titleStyle={{ fontWeight: 'bold' }}
            />
          </View>
        </Card.Content>

      </Card>
    </View>
  )
}

export default AttendanceScreen

const styles = StyleSheet.create({})