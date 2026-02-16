import './cardBartenders.scss'
import type { CardsForBartenders } from '../BodyBartenders/BodyBartenders'

const CardBartenders = ({name, category, structure}: Omit<CardsForBartenders, 'id'>) => {
  return (
    <>
    <div className="card">
        <h2>{name}</h2>
        <p><b>Категория:</b> {category}</p>
        {structure.map(({nameStructure, unit, count}) => (
            <div>
                <p><b>{nameStructure}</b>  {`${count} ${unit}`}</p>
            </div>))}
        <button style={{backgroundColor:'red'}}>Удалить</button>
        <button>Изменить</button>
    </div>

    </>
  )
}

export default CardBartenders