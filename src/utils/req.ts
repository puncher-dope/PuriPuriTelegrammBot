// type ApiResponseType<T> = {
//     data: T
// }

import type { ApiResponseType } from "@/types/apiResponseType"

export async function request<T>(
    url: string,
    method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE',
    body?: unknown): Promise<ApiResponseType<T>> {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: method,
            // credentials:'include',
            body: body ? JSON.stringify(body) : undefined
        })

        const data = await response.json()
        return {
            data,
            error: null
        }
    } catch (error: unknown) {
        return {
            data: undefined,
            error: error instanceof Error ? error.message : ''
        }
    }
}