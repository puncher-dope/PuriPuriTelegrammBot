import './cardWaiters.scss'
import type { CardsForWaiters } from '@/types/cardT'
import { useState } from 'react'  // ← ТОЛЬКО ЭТО ДОБАВИТЬ
import FormAddDrinksWaiters from '@/components/Forms/FormAddDrinksWaiters/FormAddDrinksWaiters'  // ← И ЭТО

type CardWaitersProps = {
  drink: CardsForWaiters
}

const CardWaiters = ({drink}: CardWaitersProps) => {
  const [isEditing, setIsEditing] = useState(false) 

  const handleEditClick = () => {
    setIsEditing(true) 
  }


  const handleCancel = () => { 
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="card editing-mode">
        <FormAddDrinksWaiters 
          setActive={handleCancel}
          initialData={drink}
        />
      </div>
    )
  }

  return (
    <>
    <div className="card">
        <h2>{drink.name}</h2>
        <p><b>Категория:</b> {drink.category}</p>
        <p><b>Объём:</b> {drink.volume}</p>
        <p><b>Состав:</b> {drink.structure}</p>
        <p><b>Комментарий:</b> {drink.comment}</p>
        <p><b>Красочное писание:</b> {drink.description}</p>
        <button onClick={handleEditClick}>Изменить</button> 
    </div>

    </>
  )
}

export default CardWaiters