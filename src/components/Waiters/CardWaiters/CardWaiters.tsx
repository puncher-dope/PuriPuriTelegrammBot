import './cardWaiters.scss'
import type { CardsForWaiters } from '../BodyWaiters/BodyWaiters'

const CardWaiters = ({name, category, structure, comment, description}: Omit<CardsForWaiters, 'id'>) => {
  return (
    <>
    <div className="card">
        <h2>{name}</h2>
        <p><b>Категория:</b> {category}</p>
        <p><b>Состав:</b> {structure}</p>
        <p><b>Комментарий:</b> {comment}</p>
        <p><b>Красочное писание:</b> {description}</p>
        <button>Изменить</button>
    </div>

    </>
  )
}

export default CardWaiters