
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const AuthAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/auth',
    }),
    tagTypes: ['Auth'],

    endpoints: (builder) => ({
        login: builder.mutation<{token: string}, void>({
            query: () => ({
                url: '/login',
            }),
            invalidatesTags: ['Auth']
        }),
        logout: builder.mutation<{message: string}, void>({
            query: () => ({
                url: '/logout',
            }),
            invalidatesTags: ['Auth']
        }),
    })
})

export const {useLoginMutation, useLogoutMutation} = AuthAPI