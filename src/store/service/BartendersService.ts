import type { CardsForBartenders } from "@/types/cardT";
import { getToken } from "@/utils/getToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const BartendersAPI = createApi({
    reducerPath: 'bartendersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders: (headers) => {
            const token = getToken()

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    tagTypes: ['Bartenders'],

    endpoints: (builder) => ({
        fetchAllBartendersMenu: builder.query<CardsForBartenders[], void>({
            query: () => ({
                url: '/menuBartenders',
            }),
            providesTags: ['Bartenders']
        }),
        createBartendersCard: builder.mutation<CardsForBartenders[], Partial<CardsForBartenders>>({
            query: (card) => ({
                url: '/menuBartenders',
                method: 'POST',
                body: card
            }),
            invalidatesTags: ['Bartenders']
        }),
        updateBartendersCard: builder.mutation<CardsForBartenders[], { _id: string, card: Partial<CardsForBartenders> }>({
            query: ({ _id, card }) => ({
                url: `/menuBartenders/${_id}`,
                method: 'PATCH',
                body: card
            }),
            invalidatesTags: ['Bartenders']
        }),
        deleteBartendersCard: builder.mutation<CardsForBartenders[], Partial<CardsForBartenders>>({
            query: (card) => ({
                url: `/menuBartenders/${card._id}`,
                method: 'DELETE',
                body: card
            }),
            invalidatesTags: ['Bartenders']
        }),

    })
})

export const { useFetchAllBartendersMenuQuery, useCreateBartendersCardMutation, useDeleteBartendersCardMutation, useUpdateBartendersCardMutation } = BartendersAPI