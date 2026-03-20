import React from 'react'
import { useForm } from 'react-hook-form'
import { schemaDrinksWaiters, type DrinksWaitersData } from './schemaDrinksWaiters'
import { zodResolver } from '@hookform/resolvers/zod';
import type { CardsForWaiters } from '@/types/cardT';
import { useCreateWaitersCardMutation, useUpdateWaitersCardMutation } from '@/store/service/WaitersService';
import { useNavigate } from 'react-router';
import './formAddDrinksWaiters.scss'


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
  const [createCard] = useCreateWaitersCardMutation()
  const [updateCard, { }] = useUpdateWaitersCardMutation()
  const navigate = useNavigate()



  const onSubmit = async (dataDr: DrinksWaitersData) => {
    try {

      if (initialData?._id) {
        const { error } = await updateCard({ _id: initialData._id, card: dataDr })
        if (error) {
          alert('Ошибка создания продукта, перезайдите в аккаунт')
          sessionStorage.removeItem('token')
          navigate('/login')
        } else {
          alert(`Напиток ${dataDr.name} успешно обновлён`)
        }
      } else {
        const { error } = await createCard(dataDr)
        if (error) {
          alert('Ошибка создания продукта, перезайдите в аккаунт')
          sessionStorage.removeItem('token')
          navigate('/login')
        } else {
          alert(`Напиток ${dataDr.name} успешно создан`)
        }
      }




      setActive(prev => !prev)

    } catch (error) {
      error instanceof Error ?
        alert(error.message) : 'Неизвестная ошибка'
    }
  }

  return (
    <form className='formWaiters' onSubmit={handleSubmit(onSubmit)}>

      <label>Название
        <input placeholder='Например: Какао с маршмеллоу' type="text"  {...register('name')} />
      </label>
      {errors.name && <p id='error-in-form'>{errors.name.message}</p>}

      <label>Объём
        <input placeholder='Например: 250мл' type="string" {...register('volume')} />
      </label>
      {errors.volume && <p id='error-in-form'>{errors.volume.message}</p>}

      <label>Категория
        <select
          id="categoriesToAddWaiters"
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
        </select>
      </label>
      {errors.category && <p id='error-in-form'>{errors.category.message}</p>}

      <label>Состав
        <textarea placeholder='Например: Молоко, какао, маршмеллоу' {...register('structure')} />
      </label>

      <label>Комментарий
        
        <textarea placeholder='Например: В составе смеси какао - сахар	' {...register('comment')} />
      </label>

      <label>Описание
        <textarea className='textareaWaiters' placeholder='Например: Сочетание аромата горячего какао и нежности воздушного зефира.' {...register('description')} />
      </label>

      <button type='submit'>Добавить</button>
      <button type='button' onClick={() => setActive(prev => !prev)}>Отмена</button>
    </form>
  )
}

export default FormAddDrinksWaiters
