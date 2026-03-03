import { useState } from 'react'
import './cardBartenders.scss'
import type { CardsForBartenders } from '@/types/cardT'
import FormAddDrinksBartenders from '@/components/Forms/FormAddDrinksBartenders/FormAddDrinksBartenders'

type CardsForBartendersProps = {
  drink: CardsForBartenders
  handleDelete: (card: CardsForBartenders) => Promise<void>
}



const CardBartenders = ({drink, handleDelete}: CardsForBartendersProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  if(isEditing){
    return (
      <div className='card editing-mode'>
        <FormAddDrinksBartenders setActive={handleCancel} initialData={drink}/>
      </div>
    )
  }


  return (
    <>
    <div className="card">
        <h2>{drink.name}</h2>
        <p><b>Категория:</b> {drink.category}</p>
        <p><b>Объём:</b> {drink.volume}</p>
        <p><b>Отдача:</b> {drink.dishes}</p>
        {drink.structure.map(({nameStructure, unit, count}, index) => (
            <div key={index}>
                <p><b>{nameStructure}</b>  {`${count} ${unit}`}</p>
            </div>))}
        <div></div>

        {drink.technology &&
         <blockquote>{drink.technology}</blockquote>
        }

        <button onClick={() => handleDelete(drink)}>Удалить</button>
        <button onClick={handleEditClick}>Изменить</button>
    </div>

    </>
  )
}

export default CardBartenders