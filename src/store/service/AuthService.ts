
import { getToken } from "@/utils/getToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const AuthAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/auth',
        prepareHeaders: (headers) => {
            const token = getToken()
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    tagTypes: ['Auth'],

    endpoints: (builder) => ({
        checkAuth: builder.query<{ authenticated: boolean, message: string }, void>({
            query: () => ({
                url: '/checkAuth'
            }),
            providesTags: ['Auth']
        }),
        login: builder.mutation<{ token: string }, { login: string, password: string }>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Auth']
        }),
        logout: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: '/logout',
                method: 'POST'
            }),
            invalidatesTags: ['Auth']
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useCheckAuthQuery } = AuthAPI