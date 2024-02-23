import { StyleSheet, View, FlatList } from 'react-native'
import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react'
import { postData } from '../utils/api';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import CircularProgress from 'react-native-circular-progress-indicator';


const AttendanceScreen = ({ route }) => {
  const [subjectList, setSubjectList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId, divisionId, studentId, semester } = route?.params
  const getListOfAllSubjects = async () => {
    // console.log("gyuf")
    // const subjectList = await postData('getSubjectOfStudents', { courseId, divisionId, studentId, semester });
    const allAttendanceDetails = await postData('getAllAttendanceDetails', { courseId, divisionId, studentId, semester });
    // const allLectureCount = await postData('getAllLectureCountOfDivis', { courseId, divisionId, studentId, semester });

    console.log("allAttendanceDetails")
    // console.log(allLectureCount.data.allAttendanceDetails)
    console.log(allAttendanceDetails.data.mergedArray)
    setSubjectList(allAttendanceDetails?.data?.mergedArray)
    setIsLoading(true)
  }

  useEffect(() => {
    getListOfAllSubjects()

  }, [])
  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 10, flex: 1 }} >

      <FlatList
        data={subjectList}
        renderItem={({ item, index }) => {
          if (isLoading) {
            return (

              <Card style={{ margin: 10 }}>
                <Card.Content>
                  <View style={{ flexDirection: 'row', justifyContent: "space-between", flex: 1, alignItems: "center" }}>
                    {/*  
                    style={{ }}
                    borderWidth:1
<Text></Text> alignText:""
                    alignItem:"center"
                    */}
                    <View style={{ flex: 0.8 }}>

                      <Text variant="bodyMedium" >{item?.subjectCode ?? "Subject Code"}</Text>
                      <Text variant="bodyMedium">{item?.name ?? "Subject Name"}</Text>
                      <Text variant="bodyMedium">{item?.firstName ?? "First"} {item?.lastName ?? "Name"}</Text>

                    </View>
                    <View style={{
                      // borderWidth: 1, borderColor: "red",
                      justifyContent: "center", alignItems: "center"
                    }}>

                      <CircularProgress
                        value={item.percentage}
                        radius={30}
                        duration={2000}
                        progressValueColor={'black'}
                        maxValue={100}
                        strokeColorConfig={[
                          { color: 'red', value: 0 },
                          { color: 'red', value: 70 },
                          { color: 'yellow', value: 80 },
                          { color: 'green', value: 90 },
                          // { color: 'green', value: 100 },
                        ]}
                        // title={'%'}
                        // titleColor={item.count>70?'white'}
                        titleStyle={{ fontWeight: 'bold', alignSelf: "center" }}
                      />

                      <View style={{
                        // borderWidth: 1, borderColor: "red", 
                        flexDirection: 'row', marginTop: 3
                      }}>
                        <Text>Attend/Held: </Text>
                        <Text>{item.count}/{item.lectureCount} </Text>
                      </View>
                    </View>
                  </View>
                </Card.Content>

              </Card>
            );
          }
        }}
      />


    </View>
  )
}

export default AttendanceScreen

const styles = StyleSheet.create({})