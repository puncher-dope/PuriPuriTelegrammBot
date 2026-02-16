import { useEffect, useState } from "react";
import { request } from "@/utils/req";
import CardBartenders from "../CardBartenders/CardBartenders";
export type CardsForBartendersStructure = {
    nameStructure: string, 
    unit: string, 
    count: string
}
export type CardsForBartenders = {
  id:number,
  name: string,
  category: string,
  structure: CardsForBartendersStructure[]
};
const bartenders = 'http://localhost:3000/cardsForBartender'


const BodyBartenders = () => {
 const [cards, setCards] = useState<CardsForBartenders[] | null>(null)

  useEffect(() => {
    const data = request<CardsForBartenders>(bartenders);
    data.then(res => setCards(res))
    console.log(data);
  }, []);

  return (
    <>
      <div className="body">
        <h1>НАПИТКИ</h1>

        <label htmlFor="searchDrink">
          НАЙДИ НАПИТОК
          <input id="searchDrink" placeholder="Начните поиск..." type="text" />
          <span className="or">или</span>
        </label>

        <label htmlFor="categories">ВЫБЕРИ КАТЕГОРИЮ</label>

        <select name="categories" id="categories">
          <option value="">-- Выберите категорию --</option>
          <option value="vine">🍷 Вино</option>
          <option value="vodka">🥃 Водка</option>
          <option value="cognac">🥃 Коньяк</option>
          <option value="wisky">🥃 Виски</option>
          <option value="coffee">☕ Кофе</option>
        </select>

        <div className="body_cards">
          {cards && cards.map((item) => (
            <CardBartenders key={item.id}
            category = {item.category}
            name={item.category}
            structure={item.structure}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default BodyBartenders