import './cardWaiters.scss'
import type { CardsForWaiters } from '@/types/cardT'
import { useState } from 'react'
import FormAddDrinksWaiters from '@/components/Forms/FormAddDrinksWaiters/FormAddDrinksWaiters'

type CardWaitersProps = {
  drink: CardsForWaiters,
  onDelete: (drink: CardsForWaiters) => void,
  handleChange: (id: string, dataDr: CardsForWaiters) => Promise<void>
}

const CardWaiters = ({ drink, onDelete }: CardWaitersProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }


  const handleCancel = () => {
    setIsEditing(false)
  }



  if (isEditing) {
    return (
      <div className="card-waiters editing-mode">
        <FormAddDrinksWaiters
          setActive={handleCancel}
          initialData={drink}
        />
      </div>
    )
  }

  return (
    <>
      <div className="card-waiters">
        <div className='card-waiters_description'>
          <h2>{drink.name}</h2>
          <p><b>Категория:</b> {drink.category}</p>
          <p><b>Объём:</b> {drink.volume}</p>
          <p><b>Состав:</b> {drink.structure}</p>
          <p><b>Комментарий:</b> {drink.comment}</p>
          <p><b>Красочное писание:</b> {drink.description}</p>
        </div>
        <div className='card-waiters_groupBtn'>
          <button onClick={handleEditClick}>Изменить</button>
          <button onClick={() => onDelete(drink)}>Удалить</button>
        </div>
      </div>

    </>
  )
}

export default CardWaiters