import { z } from 'zod'
export const schemaDrinksWaiters = z.object({
    // id: z.string(),
    name: z.string().min(1, 'Название обязательно').max(30,'Название должно быть не более 30 символов'),
    volume: z.string().min(1, 'Объём обязателен'),
    category: z.enum(['wine', 'vodka', 'cognac', 'wisky', 'coffee', 'coctail', 'limonade'], {
        error: 'Выберите категорию'
    }).optional(),
    structure: z.string(),
    comment: z.string().optional(),
    description: z.string().optional(),
})

export type DrinksWaitersData = z.infer<typeof schemaDrinksWaiters>

