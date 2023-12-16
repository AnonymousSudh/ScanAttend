import { createSlice, nanoid } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    user: {
        token: null,
        loading: false,
        error: ""
    }

}

export const authSlice = createSlice({
    name: "user",
    initialState, // every slice has a initial state 
    reducers: { //  action is what the user is sending/ state is to change the initial state
        login: (state, action) => { // it is that function(also known as action) through which we update our state
            state.user.token = action.payload.token
        },
        logout: (state, action) => {
            state.user.token = null
            AsyncStorage.removeItem('token')
        }
    },
})

export const {login,logout} = authSlice.actions // here we export individually because we have to use indivisual reducer at any component as per our use.

export default authSlice.reducer // here we export default (means we export whole reducer) to make it aware at store.js.