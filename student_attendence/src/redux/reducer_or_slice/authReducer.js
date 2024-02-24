import { createSlice, nanoid } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStudent, loginStudent } from "../action/authAction";

const initialState = {
    studentId: null,
    isLoading: true,
    error: null,
    msg: null,
    token: null,
    mobileNumber: null,
    rollNumber: null,
    userName: null,
    course: null,

}

export const authSlice = createSlice({
    name: "user",
    initialState, // every slice has a initial state 
    reducers: { //  action is what the user is sending/ state is to change the initial state
        login: (state, action) => { // it is that function(also known as action) through which we update our state

            state.token = action.payload.token
        },
        logout: (state, action) => {
            console.log("logout called")
            state.token = null
            state.studentId = null
            state.isLoading = false
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(createStudent.pending, (state) => {
                console.log("pending State reducer")
                state.isLoading = true;

            })
            .addCase(createStudent.fulfilled, (state, action) => {
                state.isLoading = false;
                const studentData = action.payload;
                console.log("studentData at auth reducer ", studentData)
                if (studentData.success) {
                    console.log()
                    state.studentId = 1;
                    // AsyncStorage.setItem('token', action.payload.token);
                    // AsyncStorage.setItem('studentId', action.payload.token);
                } else {
                    state.error = action.payload.error
                    state.msg = action.payload.msg
                }
            })
            .addCase(createStudent.rejected, (state, action) => {
                console.log("Rejected Reducer")
                console.log(action)
                state.isLoading = false;

            })

            // for login Faculty
            .addCase(loginStudent.pending, (state) => {
                state.isLoading = true;
                // console.log("action")

            })
            .addCase(loginStudent.fulfilled, (state, action) => {

                console.log("action", action.payload.success)  //action.payload.data.user 
                console.log("payload", action.payload)
                if (action.payload.success) {
                    // console.log("inside")
                    const token = "xyz"
                    state.token = token
                    state.studentId = action.payload.data.id
                    state.isLoading = false
                    state.mobileNumber = action.payload.data.mobileNumber
                    state.rollNumber = action.payload.data.rollNumber
                    state.userName = action.payload.data.userName
                    state.course = action.payload.data.course
                }

            })
            .addCase(loginStudent.rejected, (state, action) => {
                console.log(action.error)
                state.isLoading = false;
            })
    }
})

export const { login, logout } = authSlice.actions // here we export individually because we have to use individually reducer at any component as per our use.

export default authSlice.reducer // here we export default (means we export whole reducer) to make it aware at store.js.