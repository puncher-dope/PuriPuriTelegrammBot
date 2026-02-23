import React from 'react'
import { useForm } from 'react-hook-form'
import { schemaDrinksWaiters, type DrinksWaitersData } from './schemaDrinksWaiters'
import { zodResolver } from '@hookform/resolvers/zod';
import type { CardsForWaiters } from '@/types/cardT';


type FormAddDrinksWaitersT = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  initialData: CardsForWaiters | null
}

const defaultValues = {
  name: '',
  volume: '',
  category: undefined,
  structure: '',
  comment: '',
  description: ''
}


const FormAddDrinksWaiters = ({ setActive, initialData }: FormAddDrinksWaitersT) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DrinksWaitersData>({
    resolver: zodResolver(schemaDrinksWaiters),
    defaultValues: initialData || defaultValues
  })

  const onSubmit = (data: DrinksWaitersData) => {
    console.log('Data Form:', data)
    setActive(prev => !prev)
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
          id="categoriesToAddWaiters"
          {...register('category')}
        >
          <option value="">-- Все категории --</option>
          <option value="wine">🍷 Вино</option>
          <option value="vodka">🥃 Водка</option>
          <option value="cognac">🥃 Коньяк</option>
          <option value="wisky">🥃 Виски</option>
          <option value="coffee">☕ Кофе</option>
          <option value="coctail">☕ Коктейль</option>
          <option value="limonade">☕ Лимонад</option>
        </select>
      </label>
      {errors.category && <p id='error-in-form'>{errors.category.message}</p>}

      <label>Состав
        <textarea {...register('structure')} />
      </label>

      <label>Комментарий
        <textarea {...register('comment')} />
      </label>

      <label>Описание
        <textarea {...register('description')} />
      </label>

      <button type='submit'>Добавить</button>
      <button type='button' onClick={() => setActive(prev => !prev)}>Отмена</button>
    </form>
  )
}

export default FormAddDrinksWaiters
