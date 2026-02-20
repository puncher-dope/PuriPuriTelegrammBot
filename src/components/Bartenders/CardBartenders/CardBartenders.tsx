import './cardBartenders.scss'
import type { CardsForBartenders } from '@/types/cardT'

const CardBartenders = ({name, category, structure, technology, volume, dishes}: Omit<CardsForBartenders, 'id'>) => {
  
  return (
    <>
    <div className="card">
        <h2>{name}</h2>
        <p><b>Категория:</b> {category}</p>
        <p><b>Объём:</b> {volume}</p>
        <p><b>Отдача:</b> {dishes}</p>
        {structure.map(({nameStructure, unit, count}, index) => (
            <div key={index}>
                <p><b>{nameStructure}</b>  {`${count} ${unit}`}</p>
            </div>))}
        <div></div>

        {technology &&
         <blockquote>{technology}</blockquote>
        }

        <button>Удалить</button>
        <button>Изменить</button>
    </div>

    </>
  )
}

export default CardBartenders