import { createContext, useContext } from "react"
import type { AuthT } from "./authTypes"
import { authLogin } from "@/lib/api/routes"
import { request } from "@/utils/req"

//Создаем контекст
const AuthContext = createContext< AuthT | undefined>(undefined)

type AuthLoginT ={
    token: string
}

export const AuthProvider = ({children} : React.PropsWithChildren) => {
    
    // Функция входа
    const login = async(body:{login: string, password: string}) => {
        const {login, password} = body
        console.log(body)
        const newBody = {
            login: login.trim(),
            password: password.trim()
        }
        console.log( newBody)

        const {data} = await request<AuthLoginT>(authLogin, 'POST', newBody) 
        
        if(data && data.token){

            sessionStorage.setItem('token', data?.token)
            return true
        }
        return false
    }
    
    // Функция выхода
    const logout = () => {
        sessionStorage.removeItem('token')
    }

    const checkAuth = () => {
        const key = sessionStorage.getItem('token')
        return key ? key : false
    }

    return (
        <AuthContext.Provider value={{checkAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    ) 
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error('')
    return context
}