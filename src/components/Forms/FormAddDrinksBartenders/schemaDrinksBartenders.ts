import { z } from 'zod'
import { schemaItemStructure } from './schemaItemStructure'


export const schemaDrinksBartenders = z.object({
    name: z.string().min(1, 'Название обязательно').max(30,'Название должно быть не более 30 символов'),
    volume: z.string().min(1, 'Объём обязателен'),
    category: z.enum(['coffee','tea','warmingTea','glintvein','mors_uzvar','water_juices','importedLemonades','cocktails','lemonades','aperitifs', 'vodka','distillates', 'gin','rum','whiskey','sangrias','nastoyki','wine','tequila','cognac', 'polufabric'], {
        error: 'Выберите категорию'
    }).optional(),
    dishes: z.enum(['Хайбол', 'Мини-Хайбол', 'Рокс', 'Мини-Рокс',
                    'Флюте', 'Снифтер', 'Чашка-200','Чашка-300',
                    'Тюльпан', 'Вино', 'Эспрессо', 'Айриш', 'Шале', 'Рюмка', 'Графин', 'Чайник', 'Полуфабрикаты']).optional(),
    structure: z.array(schemaItemStructure),
    technology: z.string().optional()
})

export type schemaDrinksBartendersData = z.infer<typeof schemaDrinksBartenders>
