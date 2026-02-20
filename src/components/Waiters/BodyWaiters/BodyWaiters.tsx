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
  const [cardsWaiters, setCardsWaiters] = useState<CardsForWaiters[] | null>(
    null,
  );

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
          <button>Добавить напиток</button>
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
