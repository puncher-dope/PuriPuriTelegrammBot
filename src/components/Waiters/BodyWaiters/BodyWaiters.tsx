import CardWaiters from "@/components/Waiters/CardWaiters/CardWaiters";
import "./bodyWaiters.scss";
import React, { useEffect, useState } from "react";
import { request } from "@/utils/req";
import type { CardsForWaiters } from "@/types/cardT";
import TopLevelBody from "@/components/topLevelBody/TopLevelBody";
import FormAddDrinksWaiters from "@/components/Forms/FormAddDrinksWaiters/FormAddDrinksWaiters";
import { useDrinkForm } from "@/components/lib/hooks/useDrinkForm";

const waiters = "http://localhost:3000/menuWaiters";

const BodyWaiters = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cardsWaiters, setCardsWaiters] = useState<CardsForWaiters[] | null>(null);

  useEffect(() => {
    const data = request<CardsForWaiters[]>(waiters, 'GET');
    data.then((res) => {
      setCardsWaiters(res);
    });
  }, []);

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);

  };
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setSelectedCategory('');
  }

  const {openForCreate, isFormOpen, close, editingDrink} = useDrinkForm()

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
          <button onClick={openForCreate}>➕ Добавить напиток</button>
          
          {isFormOpen &&
            <div className="active">
              <FormAddDrinksWaiters setActive={close} initialData={editingDrink} />
            </div>
          }

          {filteredDrinks && filteredDrinks?.length > 0 ?
            filteredDrinks.map((drink) => (
              <CardWaiters
                key={drink.id}
                drink={drink}
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
