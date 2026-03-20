import React from "react";
import { useLocation } from "react-router";

type TopLevelBodyT = {
  searchQuery: string,
  handleSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectedCategory: string,
  handleChangeCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

const TopLevelBody = ({ searchQuery, handleSearchQuery, selectedCategory, handleChangeCategory }: TopLevelBodyT) => {
  const location = useLocation()
  const employee = location.pathname === '/bartenders' ? `барменов` : 'официантов'
  return (
    <>
      <h1>НАПИТКИ {employee}</h1>



      <label htmlFor="categories_drinks">ВЫБЕРИ КАТЕГОРИЮ</label>
      <select
        name="categories"
        id="categories_drinks"
        value={selectedCategory}
        onChange={handleChangeCategory}
        size={1}
      >
        <option value="">-- Все категории --</option>
        <option value="coffee">🍷 Кофе</option>
        <option value="tea">🥃 Чай</option>
        <option value="warmingTea">🥃 Согревающий чай</option>
        <option value="glintvein">🥃 Глинтвейн</option>
        <option value="mors_uzvar">☕ Морс и Узвар</option>
        <option value="water_juices">☕ Вода и соки</option>
        <option value="importedLemonades">☕ Импортные лимонады</option>
        <option value="cocktails">🍷 Коктейли</option>
        <option value="lemonades">🥃 Лимонады</option>
        <option value="aperitifs">🥃 Аперетивы</option>
        <option value="vodka">🥃 Водка</option>
        <option value="distillates">☕ Дистилляты</option>
        <option value="gin">☕ Джин</option>
        <option value="rum">☕ Ром</option>
        <option value="whiskey">☕ Виски</option>
        <option value="sangrias">☕ Сангрии</option>
        <option value="nastoyki">☕ Настойки</option>
        <option value="wine">☕ Вино</option>
        <option value="tequila">☕ Текила</option>
        <option value="cognac">☕ Коньяк</option>
      </select>

      <span className="or">или</span>
      <label htmlFor="searchDrink">
        НАЙДИ НАПИТОК
        <input
          id="searchDrink"
          placeholder="Начните поиск..."
          type="text"
          value={searchQuery}
          onChange={handleSearchQuery}
        />
      </label>
    </>
  );
};

export default TopLevelBody;
