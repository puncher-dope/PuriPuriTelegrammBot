import { useAuth } from '@/context/authContext'
import { type ReactNode } from 'react'
import { Navigate } from 'react-router'

type ProtectedRouteT = {
    children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteT) {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to={'/login'} />
    }

    return children
}
