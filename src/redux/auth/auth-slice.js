import { createSlice } from '@reduxjs/toolkit';

const state = {
    userId: null,
    nickname: null,
    email: null,
    avatarURL: null,
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
            email: payload.email,
            avatarURL: payload.avatarURL,
        }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.stateChange,
        }),
        authSignOut: () => state,
        addUserPhoto: (state, { payload }) => ({
            ...state,
            avatarURL: payload.avatarURL,
        }),
        removeUserPhoto: (state, { payload }) => ({
            avatarURL: null,
        }),
    }
})

export const auth = authSlice.name;
export const { updateUserProfile, authStateChange, authSignOut, addUserPhoto, removeUserPhoto } = authSlice.actions;
export const authReducer = authSlice.reducer;