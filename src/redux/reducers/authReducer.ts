import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    id: string,
    email: string,
    accessToken: string
}


const initialState: AuthState = {
    id: "",
    email: "",
    accessToken: "",

}

const authSlice = createSlice({
    name: "auth",
    initialState: { authData: initialState },
    reducers: {
        addAuth: (state, acction) => {
            state.authData = acction.payload
        },
        removeAuth: (state, acction) => {
            state.authData = initialState
        },
    }
})

export const authReducer = authSlice.reducer
export const { addAuth, removeAuth } = authSlice.actions

export const authSelector = (state: any) => state.authReducer.authData