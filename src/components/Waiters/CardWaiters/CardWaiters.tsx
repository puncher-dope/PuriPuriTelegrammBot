import './cardWaiters.scss'
import type { CardsForWaiters } from '@/types/cardT'

const CardWaiters = ({name, category, structure, comment, description, volume}: Omit<CardsForWaiters, 'id'>) => {
  return (
    <>
    <div className="card">
        <h2>{name}</h2>
        <p><b>Категория:</b> {category}</p>
        <p><b>Объём:</b> {volume}</p>
        <p><b>Состав:</b> {structure}</p>
        <p><b>Комментарий:</b> {comment}</p>
        <p><b>Красочное писание:</b> {description}</p>
        <button>Изменить</button>
    </div>

    </>
  )
}

export default CardWaiters