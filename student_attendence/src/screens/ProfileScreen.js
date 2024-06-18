import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fetchData, postData } from "../utils/api"
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logout } from '../redux/reducer_or_slice/authReducer'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.auth);
    console.log(data, "data")
    const navigation = useNavigation();

    const updateUser = async () => {
        const newData = { id: 20, userName: "suchita_chaubey" }
        const result = await postData('update', newData); // this line takes time
        console.log("result", result)
    }
    const logoutStudent = async () => {
        try {
            // try add use dispatch to manuplate datac
            console.log("1")
            dispatch(logout());
            console.log("2")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Text>ProfileScreen</Text>

            <TouchableOpacity onPress={updateUser}>
                <Text>Update</Text>
                {/* <Button></Button> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('MyAttendance', {
                    // studentId, courseId, divisionId, semester
                }); // Navigate to MyAttendance screen
            }}>
                <Text>My Attendance</Text>
                {/* <Button></Button> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={logoutStudent}>
                <Text>Logout</Text>
                {/* <Button></Button> */}
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})