import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fetchData, postData } from "../utils/api"
import { useSelector, useDispatch } from 'react-redux'

const ProfileScreen = () => {
    const usesel = async () => {
        const data = await useSelector(state => { state.user })
        console.log(data)

    }
    usesel()

    const updateUser = async () => {
        const newData = { id: 20, userName: "suchita_chaubey" }
        const result = await postData('update', newData); // this line takes time
        console.log("result", result)
    }
    return (
        <View>
            <Text>ProfileScreen</Text>

            <TouchableOpacity onPress={updateUser}>
                <Text>Update</Text>
                {/* <Button></Button> */}
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})