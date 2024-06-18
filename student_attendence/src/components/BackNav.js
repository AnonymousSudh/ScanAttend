import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BackNav = () => {
    const navigation = useNavigation()
    return (
        <View style={{}}>
            <TouchableOpacity onPress={() => {
                navigation.goBack()
            }}>

                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default BackNav

const styles = StyleSheet.create({})