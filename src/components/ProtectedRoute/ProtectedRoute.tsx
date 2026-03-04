
import { useCheckAuthQuery } from '@/store/service/AuthService'
import {type ReactNode } from 'react'
import { Navigate } from 'react-router'

type ProtectedRouteT = {
    children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteT) {
   const {data, isFetching} = useCheckAuthQuery()

    
    if (isFetching) {
        return <div>Загружаемся...</div>
    } 

    if (!isFetching && !data) {
        return <Navigate to={'/login'} />
    }

    return children
}
