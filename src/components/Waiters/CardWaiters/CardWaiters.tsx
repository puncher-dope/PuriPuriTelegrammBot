import './cardWaiters.scss'
import type { CardsForWaiters } from '@/types/cardT'
import { useState } from 'react'
import FormAddDrinksWaiters from '@/components/Forms/FormAddDrinksWaiters/FormAddDrinksWaiters'

type CardWaitersProps = {
  drink: CardsForWaiters,
  onDelete: (id: string) => Promise<void>,
  fetchDrinks: () => Promise<void>
  handleChange: (id: string, dataDr: CardsForWaiters) => Promise<void>
}

const CardWaiters = ({drink, onDelete, fetchDrinks} : CardWaitersProps) => {
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
          fetchDrinks={fetchDrinks}
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
        <button onClick={() => onDelete(drink.id)}>Удалить</button> 
    </div>

    </>
  )
}

export default CardWaiters