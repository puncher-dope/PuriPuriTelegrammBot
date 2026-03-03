
import type { CardsForWaiters } from "@/types/cardT";
import { getToken } from "@/utils/getToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const WaitersAPI = createApi({
    reducerPath: 'waitersAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000',
        //Это нужно что бы токен из сессинного хранилища подтянулся
       prepareHeaders: (headers) => {
            // 👈 Получаем токен из Redux store
            const token = getToken()
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    tagTypes: ['Waiters'],

    endpoints: (builder) => ({
        fetchAllWaitersMenu: builder.query<CardsForWaiters[], void>({
            query: () => ({
                url: '/menuWaiters'
            }),
            providesTags: ['Waiters']
        }),
        createWaitersCard: builder.mutation<CardsForWaiters[], Partial<CardsForWaiters>>({
            query: (card) => ({
                url: `/menuWaiters`,
                method: 'POST',
                body: card
            }),
            invalidatesTags: ['Waiters']
        }),
        updateWaitersCard: builder.mutation<CardsForWaiters[], {_id: string, card : Partial<CardsForWaiters>}>({
            query: ({_id, card}) => ({
                url: `/menuWaiters/${_id}`,
                method: 'PATCH',
                body: card
            }),
            invalidatesTags: ['Waiters']
        }),
        deleteWaitersCard: builder.mutation<CardsForWaiters[], Partial<CardsForWaiters>>({
            query: (card) => ({
                url: `/menuWaiters/${card._id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Waiters']
        })
    })
})

export const { useFetchAllWaitersMenuQuery,useCreateWaitersCardMutation,useDeleteWaitersCardMutation,useUpdateWaitersCardMutation } = WaitersAPI

 