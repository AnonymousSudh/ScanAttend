import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData } from "../../utils/api";
import AsyncStorage from '@react-native-async-storage/async-storage';



export const createStudent = createAsyncThunk('createStudent', async (studentData) => {
    try {
        const result = await postData('createStudent', studentData);
        console.log("result", result);
        return result;
    } catch (error) {
        console.log(error)
        throw error
    }
});


export const loginStudent = createAsyncThunk('loginStudent', async (data) => {
    try {
        const response = await postData('loginStudent', data);
        // console.log("response at frontend", response)
        if (response.success) {
            const token = "ss"
            console.log(token)
            AsyncStorage.setItem('studentId', String(response.data.id));
            AsyncStorage.setItem('token', token);
        }
        return response;
    } catch (error) {
        console.log("----- Error ----")
        console.log(error);
        throw error
    }
});