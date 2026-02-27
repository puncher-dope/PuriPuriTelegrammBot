export type AuthT = {
    checkAuth: () => string | boolean
    login: (body:{login: string, password: string}) => Promise<boolean>
    logout: () => void
}