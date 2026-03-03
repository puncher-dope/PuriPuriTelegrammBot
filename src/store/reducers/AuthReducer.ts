
import { getToken } from "@/utils/getToken";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthAPI } from "@/store/service/AuthService";
import type {  RootState } from "../store";

type authState = {
    token: string,
    isAuth: boolean
}

const initialState: authState = {
    token: '',
    isAuth: !!getToken()
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            state.isAuth = !!action.payload
            if (typeof window !== 'undefined') {
                if (action.payload) {
                    sessionStorage.setItem('token', action.payload)
                } else {
                    sessionStorage.removeItem('token')
                }
            }
        },
        clearToken: (state) => {
            state.token = ''
            state.isAuth = false
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem('token');
            }
        }
    },
    extraReducers: (builder) => {
         builder
            .addMatcher(
                AuthAPI.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.token = payload.token;
                    state.isAuth = true;
                    if (typeof window !== 'undefined') {
                        sessionStorage.setItem('token', payload.token);
                    }
                }
            )
            .addMatcher(
                AuthAPI.endpoints.logout.matchFulfilled,
                (state) => {
                    state.token = '';
                    state.isAuth = false;
                    if (typeof window !== 'undefined') {
                        sessionStorage.removeItem('token');
                    }
                }
            )
            .addMatcher(
                AuthAPI.endpoints.login.matchRejected,
                (state) => {
                    state.token = '';
                    state.isAuth = false;
                }
            );
    } 
})

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;


