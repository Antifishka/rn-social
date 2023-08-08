import { createSlice } from '@reduxjs/toolkit';

const state = {
    userId: null,
    nickname: null,
    stateChange: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            nickname: payload.nickname,
        }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.stateChange,
        }),
        authSignOut: () => state,
    }
})

export const auth = authSlice.name;
export const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;
export const authReducer = authSlice.reducer;