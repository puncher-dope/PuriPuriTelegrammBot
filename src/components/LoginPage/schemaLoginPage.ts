import {z} from 'zod'

export const schemaLoginPage = z.object({
    login: z.string().min(3,'Пароль слишком короткий').max(10, 'Пароль слишком длинный'),
    password: z.string().min(3,'Логин слишком короткий').max(10, 'Логин слишком длинный')
})


export type schemaLoginPageData = z.infer<typeof schemaLoginPage>