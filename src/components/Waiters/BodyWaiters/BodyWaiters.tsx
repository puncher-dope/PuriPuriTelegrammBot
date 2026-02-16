import CardWaiters from "@/components/Waiters/CardWaiters/CardWaiters";
import "./bodyWaiters.scss";
import { useEffect, useState } from "react";
import { request } from "@/utils/req";
export type CardsForWaiters = {
  id: string;
  name: string;
  category: string;
  structure: string;
  comment: string;
  description: string;
};

const waiters = 'http://localhost:3000/cardsForWaiter'

const BodyWaiters = () => {
  const [cards, setCards] = useState<CardsForWaiters[] | null>(null)

  useEffect(() => {
    const data = request<CardsForWaiters>(waiters);
    data.then(res => setCards(res))
    // console.log(data);
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
            <CardWaiters key={item.id} 
            name={item.name}
            category={item.category}
            structure={item.structure}
            comment={item.comment}
            description={item.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BodyWaiters;
