import CardWaiters from "@/components/Waiters/CardWaiters/CardWaiters";
import "./bodyWaiters.scss";
import React, { useEffect, useState } from "react";
import { request } from "@/utils/req";
import type { CardsForWaiters, CardT } from "@/types/cardT";
import TopLevelBody from "@/components/topLevelBody/TopLevelBody";

const waiters = "http://localhost:3000/cards";

const BodyWaiters = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cardsWaiters, setCardsWaiters] = useState<CardsForWaiters[] | null>(null);
  const [active, setActive] = useState(false)

  useEffect(() => {
    const data = request<CardT>(waiters);
    data.then((res) => {
      const { menuWaiters } = res;
      setCardsWaiters(menuWaiters);
    });
  }, []);

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);

  };
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setSelectedCategory('');
  }


  const filteredDrinks = cardsWaiters?.filter((drink) => {
    const matchCategory = selectedCategory === '' || drink.category === selectedCategory;
    const matchSearch = drink.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      drink.structure.toLowerCase().includes(searchQuery.trim().toLowerCase())

    return matchCategory && matchSearch
  });

  return (
    <>
      <div className="body">
        <TopLevelBody
          searchQuery={searchQuery}
          handleSearchQuery={handleSearchQuery}
          selectedCategory={selectedCategory}
          handleChangeCategory={handleChangeCategory}
        />

        <div className="body_cards">
          <button onClick={() => setActive(prev => !prev)}>Добавить напиток</button>
          {active &&
            <div>
              <form>
                <label htmlFor="">Название
                  <input type="text" name="" id="" />
                </label>
                <label htmlFor="">Объём
                  <input type="number" name="" id="" />
                </label>
                <label htmlFor="">Категория
                  <select
                    name="categories"
                    id="categories"
                    value={selectedCategory}
                    onChange={handleChangeCategory}
                  >
                    <option value="">-- Все категории --</option>
                    <option value="wine">🍷 Вино</option>
                    <option value="vodka">🥃 Водка</option>
                    <option value="cognac">🥃 Коньяк</option>
                    <option value="wisky">🥃 Виски</option>
                    <option value="coffee">☕ Кофе</option>
                    <option value="coctail">☕ Коктейль</option>
                    <option value="limonade">☕ Лимонад</option>
                  </select>
                </label>
                <label htmlFor="">Состав
                  <textarea/>
                </label>
                <label htmlFor="">Комментарий
                  <textarea />
                </label>
                <label htmlFor="">Описание
                  <textarea/>
                </label>
                <button>Добавить</button>
                <button onClick={() => setActive(prev => !prev)}>Отмена</button>
              </form>
            </div>}

          {filteredDrinks && filteredDrinks?.length > 0 ?
            filteredDrinks.map((item) => (
              <CardWaiters
                key={item.id}
                name={item.name}
                volume={item.volume}
                category={item.category}
                structure={item.structure}
                comment={item.comment}
                description={item.description}
              />
            )) :
            <p>Ничего не найдено</p>
          }
        </div>
      </div>
    </>
  );
};

export default BodyWaiters;
