import { z } from 'zod'
export const schemaDrinksBartenders = z.object({
    name: z.string().min(1, 'Название обязательно'),
    volume: z.number({
        error: 'Объём обязателен, объём должен быть числом'
    }).positive('Объём должен быть положительным'),
    category: z.enum(['wine', 'vodka', 'cognac', 'wisky', 'coffee', 'coctail', 'limonade'], {
        error: 'Выберите категорию'
    }),
    structure: z.string().optional(),
    comment: z.string().optional(),
    description: z.string().optional(),
})

export type DrinksWaitersData = z.infer<typeof schemaDrinksBartenders>
