import { z } from 'zod'
import { schemaItemStructure } from './schemaItemStructure'


export const schemaDrinksBartenders = z.object({
    name: z.string().min(1, 'Название обязательно'),
    volume: z.string().min(1, 'Объём обязателен'),
    category: z.enum(['wine', 'vodka', 'cognac', 'wisky', 'coffee', 'coctail', 'limonade']).optional(),
    dishes: z.enum(['Хайбол', 'Мини-Хайбол', 'Рокс', 'Мини-Рокс',
                    'Флюте', 'Снифтер', 'Чашка-200','Чашка-300',
                    'Тюльпан', 'Вино', 'Эспрессо', 'Айриш', 'Шале', 'Рюмка']).optional(),
    structure: z.array(schemaItemStructure),
    technology: z.string().optional()
})

export type schemaDrinksBartendersData = z.infer<typeof schemaDrinksBartenders>
