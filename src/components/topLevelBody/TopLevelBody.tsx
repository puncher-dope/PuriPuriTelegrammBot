import React from "react";

type TopLevelBodyT = {
    searchQuery: string,
    handleSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void
    selectedCategory: string,
    handleChangeCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

const TopLevelBody = ({searchQuery, handleSearchQuery, selectedCategory, handleChangeCategory} : TopLevelBodyT) => {
  return (
    <>
      <h1>НАПИТКИ</h1>

      <label htmlFor="searchDrink">
        НАЙДИ НАПИТОК
        <input
          id="searchDrink"
          placeholder="Начните поиск..."
          type="text"
          value={searchQuery}
          onChange={handleSearchQuery}
        />
        <span className="or">или</span>
      </label>

      <label htmlFor="categories">ВЫБЕРИ КАТЕГОРИЮ</label>
      <select
        name="categories"
        id="categories"
        value={selectedCategory}
        onChange={handleChangeCategory}
      >
        <option value="">-- Все категории --</option>
        <option value="vine">🍷 Вино</option>
        <option value="vodka">🥃 Водка</option>
        <option value="cognac">🥃 Коньяк</option>
        <option value="wisky">🥃 Виски</option>
        <option value="coffee">☕ Кофе</option>
        <option value="coctail">☕ Коктейль</option>
        <option value="limonade">☕ Лимонад</option>
      </select>
    </>
  );
};

export default TopLevelBody;
