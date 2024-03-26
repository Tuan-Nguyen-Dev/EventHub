import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    id: string,
    email: string,
    accesstoken: string,
    follow_events: string[],
    fcmTokens?: string[],
    following?: string[]
}


const initialState: AuthState = {
    id: '',
    email: '',
    accesstoken: '',
    follow_events: [],
    fcmTokens: []

};

const authSlice = createSlice({
    name: 'auth',
    initialState: { authData: initialState },
    reducers: {
        addAuth: (state, acction) => {
            state.authData = acction.payload;
        },
        removeAuth: (state, acction) => {
            state.authData = initialState;
        },
        addFollowedEvent: (state, acction) => {
            state.authData.follow_events = acction.payload
        },
        updateFollowing: (state, action) => {
            state.authData.following = action.payload
        }
    },
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, addFollowedEvent, updateFollowing } = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;
