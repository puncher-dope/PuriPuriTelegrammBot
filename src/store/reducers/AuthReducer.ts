
import { getToken } from "@/utils/getToken";
import { createSlice } from "@reduxjs/toolkit";
import { AuthAPI } from "@/store/service/AuthService";

type authState = {
    token: null | string,
    isAuth: boolean
}

const initialState: authState = {
    token: null,
    isAuth: !!getToken()
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
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

export const { } = authSlice.actions;

export default authSlice.reducer;


