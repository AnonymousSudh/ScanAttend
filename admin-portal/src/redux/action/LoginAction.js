import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostData } from "../../utils/api";


export const createFaculty = createAsyncThunk('createFaculty', async (formData) => {
    try {
        const response = await PostData('signUpFaculty', formData);
        console.log("create user login action")
        console.log(response)

        return response;

    } catch (error) {
        console.log(error)
        throw error
    }
});


export const loginFaculty = createAsyncThunk('loginFaculty', async (data) => {
    try {
        const response = await PostData('loginFaculty', data);
        console.log("response at frontend", response)
        if(!response.error){
            console.log("setting token")
            localStorage.setItem('facultyToken',response.data.token)
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error
    }
});