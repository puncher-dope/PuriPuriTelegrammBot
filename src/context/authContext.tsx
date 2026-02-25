import React, { createContext, useContext, useState } from "react";
import type { AuthT } from "./authTypes";

//Создаем контекст
const AuthContext = createContext< AuthT | undefined>(undefined)

// Провайдер, который оборачивает всё приложение
export const AuthProvider = ({children} : React.PropsWithChildren) => {
    const [user, setUser] = useState<{name:string} | null>(null)
    
    // Функция входа
    const login = (login: string, password: string) => {
        if(login === 'kim' && password==='123'){
            setUser({name:login})
            return true
        }
        return false
    }
    
    // Функция выхода
    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    ) 
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error('')
    return context
}

