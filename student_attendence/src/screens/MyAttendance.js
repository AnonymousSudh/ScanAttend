import { StyleSheet, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { fetchDataByQuery } from '../utils/api';
import { ActivityIndicator, Card, Text } from 'react-native-paper';
import CircularProgress from 'react-native-circular-progress-indicator';

const MyAttendance = () => {
    const data = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(true);
    const [lectureData, setLectureData] = useState([]);
    const [attendCount, setAttendCount] = useState([]);
    const [finalData, setFinalData] = useState([]);

    const getLectureData = async () => {
        const lectureData = await fetchDataByQuery('getLectureDataAndCount', { courseId: 1 });
        if (lectureData.data) {
            setLectureData(lectureData.data);
        }
    }

    const getAttendData = async () => {
        const attendData = await fetchDataByQuery('getAttendCount', { studentId: data.studentId });
        console.log(attendData, "attendData")
        if (attendData.data) {
            setAttendCount(attendData.data);
        }
    }

    const setFinalDataFunction = () => {
        if (lectureData.length > 0 && attendCount.length > 0) {
            const data = lectureData.map((lecture) => {
                console.log(attendCount, "attendCount")
                const matchingAttendData = attendCount.find((attend) => attend.id === lecture.subjectId);
                console.log(matchingAttendData, "matchinData")
                const attendCountValue = matchingAttendData ? matchingAttendData.count : 0;
                return {
                    subjectId: lecture.subjectId,
                    name: lecture.name,
                    attendCount: attendCountValue,
                    firstName: lecture.firstName,
                    lastName: lecture.lastName,
                    heldCount: lecture.count,
                    subjectCode: lecture.subjectCode
                }
            });
            setFinalData(data);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getLectureData();
        getAttendData();
    }, []);

    useEffect(() => {
        setFinalDataFunction();
    }, [lectureData, attendCount]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", }}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    return (
        <View style={{ paddingVertical: 20, paddingHorizontal: 10 }} >
            <FlatList
                data={finalData}
                renderItem={({ item, index }) => {
                    { console.log(item) }
                    return (

                        <Card style={{ margin: 10 }}>
                            <Card.Content>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", flex: 1, alignItems: "center" }}>
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
                                            value={((item.attendCount / item.heldCount) * 100)}
                                            radius={30}
                                            duration={2000}
                                            progressValueColor={'black'}
                                            maxValue={100}
                                            strokeColorConfig={[
                                                { color: 'red', value: -1 },
                                                { color: 'red', value: 0 },
                                                { color: 'red', value: 70 },
                                                { color: 'yellow', value: 80 },
                                                { color: 'green', value: 90 },
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
                                            <Text>{item.attendCount}/{item.heldCount} </Text>
                                        </View>
                                    </View>
                                </View>
                            </Card.Content>

                        </Card>
                    );
                }}
            />


        </View>
    )
}

export default MyAttendance

const styles = StyleSheet.create({})