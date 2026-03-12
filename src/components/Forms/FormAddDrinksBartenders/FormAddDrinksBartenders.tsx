import './formBrtenders.scss'
import { useForm, useFieldArray } from 'react-hook-form'
import { schemaDrinksBartenders, type schemaDrinksBartendersData } from './schemaDrinksBartenders'
import { zodResolver } from '@hookform/resolvers/zod';
import type { CardsForBartenders } from '@/types/cardT';
import { useCreateBartendersCardMutation, useUpdateBartendersCardMutation } from '@/store/service/BartendersService';

type FormAddDrinksBartendersProps = {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    initialData: CardsForBartenders | null
}

const defaultValues = {
    name: '',
    volume: '',
    category: undefined,
    dishes: undefined,
    structure: [{ nameStructure: '', unit: '', count: '' }],
    technology: '',
};

const prepareFormData = (data: CardsForBartenders | null): schemaDrinksBartendersData => {
    if (!data) return defaultValues;

    return {
        name: data.name,
        volume: data.volume,
        category: data.category || undefined,
        dishes: data.dishes,
        structure: data.structure.length > 0 ? data.structure : defaultValues.structure,
        technology: data.technology,
    };
};




export default function FormAddDrinksBartenders({ setActive, initialData }: FormAddDrinksBartendersProps) {

    const { handleSubmit, register, formState: { errors }, control } = useForm<schemaDrinksBartendersData>({
        resolver: zodResolver(schemaDrinksBartenders),
        defaultValues: prepareFormData(initialData)
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'structure'
    })
    const [createCard] = useCreateBartendersCardMutation()
    const [updateCard] = useUpdateBartendersCardMutation()


    const onSubmit = async (dataDr: schemaDrinksBartendersData) => {
        try {
            if (initialData?._id) {
                await updateCard({ _id: initialData._id, card: dataDr })
                alert(`Напиток ${initialData.name} успешно обновлён`);
            } else {
                await createCard(dataDr)
                alert(`Напиток ${dataDr.name} успешно создан`)
            }
            setActive(prev => !prev)
        } catch (error) {
            error instanceof Error ?
                alert(error.message) : 'Неизвестная ошибка'
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <label>Название
                <input type="text"  {...register('name')} />
            </label>
            {errors.name && <p id='error-in-form'>{errors.name.message}</p>}

            <label>Объём
                <input type="string" {...register('volume')} />
            </label>
            {errors.volume && <p id='error-in-form'>{errors.volume.message}</p>}

            <label>Категория
                <select
                    className="categoriesToAddWaiters"
                    {...register('category')}
                >
                    <option value="">-- Все категории --</option>
                    <option value="coffee">🍷 Кофе</option>
                    <option value="tea">🥃 Чай</option>
                    <option value="warmingTea">🥃 Согревающий чай</option>
                    <option value="glintvein">🥃 Глинтвейн</option>
                    <option value="mors_uzvar">☕ Морс и Узвар</option>
                    <option value="water_juices">☕ Вода и соки</option>
                    <option value="importedLemonades">☕ Импортные лимонады</option>
                    <option value="cocktails">🍷 Коктейли</option>
                    <option value="lemonades">🥃 Лимонады</option>
                    <option value="aperitifs">🥃 Аперетивы</option>
                    <option value="vodka">🥃 Водка</option>
                    <option value="distillates">☕ Дистилляты</option>
                    <option value="gin">☕ Джин</option>
                    <option value="rum">☕ Ром</option>
                    <option value="whiskey">☕ Виски</option>
                    <option value="sangrias">☕ Сангрии</option>
                    <option value="nastoyki">☕ Настойки</option>
                    <option value="wine">☕ Вино</option>
                    <option value="tequila">☕ Текила</option>
                    <option value="cognac">☕ Коньяк</option>
                    <option value="pf">☕ Полуфабрикаты</option>
                </select>
            </label>
            {errors.category && <p id='error-in-form'>{errors.category.message}</p>}

            <label>Отдача
                <select
                    className="categoriesToAddWaiters"
                    {...register('dishes')}>
                    <option value="Хайбол">Хайбол</option>
                    <option value="Мини-Хайбол">Мини-Хайбол</option>
                    <option value="Рокс">Рокс</option>
                    <option value="Мини-Рокс">Мини-Рокс</option>
                    <option value="Флюте">Флюте</option>
                    <option value="Снифтер">Снифтер</option>
                    <option value="Чашка-200">Чашка-200</option>
                    <option value="Чашка-300">Чашка-300</option>
                    <option value="Тюльпан">Тюльпан</option>
                    <option value="Вино">Вино</option>
                    <option value="Эспрессо">Эспрессо</option>
                    <option value="Айриш">Айриш</option>
                    <option value="Шале">Шале</option>
                    <option value="Рюмка">Рюмка</option>
                    <option value="Графин">Графин</option>
                    <option value="Чайник">Чайник</option>
                    <option value="Полуфабрикаты">☕ Полуфабрикаты</option>
                </select>
            </label>
            {errors.dishes && <p id='error-in-form'>{errors.dishes.message}</p>}

            <div className='structure-block'>
                <h3>Состав напитка</h3>

                {fields.map((field, index) => (
                    <div key={field.id} className='structure-item'>
                        <h4>Ингедиент: {index + 1}</h4>
                        <label>
                            Название
                            <input
                                {...register(`structure.${index}.nameStructure`)}
                                placeholder="например: Кофе зерна"
                            />
                        </label>
                        <label>
                            Единица измерения
                            <select {...register(`structure.${index}.unit`)}>
                                <option value="гр">гр</option>
                                <option value="мл">мл</option>
                                <option value="шт">шт</option>
                            </select>
                        </label>
                        <label>
                            Количество
                            <input
                                {...register(`structure.${index}.count`)}
                                placeholder="например: 18"
                            />
                        </label>


                        {fields.length > 1 && (
                            <button type='button' onClick={() => remove(index)}>
                                Удалить ингедиент
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button type='button' onClick={() =>
                append({ nameStructure: '', unit: '', count: '' })}>
                Добавить ингедиент
            </button>

            <label>Технология приготовления
                <textarea {...register('technology')} />
            </label>

            <button type='submit'>Добавить</button>
            <button type='button' onClick={() => setActive(prev => !prev)}>Отмена</button>
        </form>
    )
}
