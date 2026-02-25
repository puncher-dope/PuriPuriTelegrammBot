import React, { createContext, useContext } from "react";
import type { AuthT } from "./authTypes";

//Создаем контекст
const AuthContext = createContext< AuthT | undefined>(undefined)

// Провайдер, который оборачивает всё приложение
export const AuthProvider = ({children} : React.PropsWithChildren) => {
    // const [user, setUser] = useState<{name:string} | null>(null)
    
    // Функция входа
    const login = (login: string, password: string) => {
        if(login === 'kim' && password==='123'){
            sessionStorage.setItem('user', `${login}`)
            return true
        }
        return false
    }
    
    // Функция выхода
    const logout = () => {
        sessionStorage.removeItem('user')
    }

    const checkAuth = () => {
        const user = sessionStorage.getItem('user')
        return user ? user : false
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

