export type AuthT = {
    checkAuth: () => string | boolean
    login: (login: string, password: string) => boolean
    logout: () => void
}