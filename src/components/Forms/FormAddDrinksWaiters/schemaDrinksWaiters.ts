import { z } from 'zod'
export const schemaDrinksWaiters = z.object({
    // id: z.string(),
    name: z.string().min(1, 'Название обязательно').max(30,'Название должно быть не более 30 символов'),
    volume: z.string().min(1, 'Объём обязателен'),
    category: z.enum(['coffee','tea','warmingTea','glintvein','mors_uzvar','water_juices','importedLemonades','cocktails','lemonades','aperitifs', 'vodka','distillates', 'gin','rum','whiskey','sangrias','nastoyki','wine','tequila','cognac'], {
        error: 'Выберите категорию'
    }).optional(),
    structure: z.string(),
    comment: z.string().optional(),
    description: z.string().optional(),
})

export type DrinksWaitersData = z.infer<typeof schemaDrinksWaiters>

