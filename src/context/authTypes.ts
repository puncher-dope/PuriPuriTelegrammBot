export type AuthT = {
    user: {name:string} | null
    login: (login: string, password: string) => boolean
    logout: () => void
}