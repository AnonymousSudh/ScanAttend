import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFaculty, loginFaculty } from "../action/LoginAction"

const initialState = {
    data: {},
    userId:null,
    isLogin: false,
    msg: "",
    isLoading: false,
    error: null,
    token: null

}

export const authSlice = createSlice({
    name: "authSlice", 
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        clearAuthData(state) {
            state.token = null;
            state.userId = null;
            localStorage.removeItem('facultyToken');
            // localStorage.removeItem('userId');
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFaculty.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(createFaculty.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action)
                state.data = action.payload;
                console.log("action", action.payload)
                if (action.payload.error) {
                    state.error = action.payload.error
                    state.msg = action.payload.msg
                }
            })
            .addCase(createFaculty.rejected, (state, action) => {
                // console.log(action.error)
                console.log(action)
                state.isLoading = false;
                // state.error
            })

            // for login Faculty
            .addCase(loginFaculty.pending, (state) => {
                state.isLoading = true;
                // console.log("action")

            })
            .addCase(loginFaculty.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data.user;
                state.userId = action.payload.data.id
                state.token = action.payload.data.token;
                state.isLogin = true

                console.log("action", action.payload)  //action.payload.data.user 
            })
            .addCase(loginFaculty.rejected, (state, action) => {
                console.log(action.error)
                state.isLoading = false;
            })
    }
})

// export const {createUser} = authSlice.actions
export const { clearAuthData } = authSlice.actions;
export default authSlice.reducer
