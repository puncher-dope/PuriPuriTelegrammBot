import React, { useEffect, useState } from "react";
import { request } from "@/utils/req";
import CardBartenders from "../CardBartenders/CardBartenders";
import type { CardsForBartenders } from "@/types/cardT";
import TopLevelBody from "@/components/topLevelBody/TopLevelBody";

const bartenders = "http://localhost:3000/menuBartenders";

const BodyBartenders = () => {
  const [cardsBartenders, setCardsBartenders] = useState<
    CardsForBartenders[] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const data = request<CardsForBartenders[]>(bartenders, 'GET');
    data.then((res) => {
      setCardsBartenders(res);
    });
  }, []);

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedCategory('');
  };
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const filteredDrinks = cardsBartenders?.filter((drink) => {
    const categoryMatch =
      selectedCategory === "" || selectedCategory === drink.category;

    const searchMatch =
      drink.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      drink.structure.some(item => item.nameStructure.toLowerCase().includes(searchQuery.trim().toLowerCase()) ) 


      return categoryMatch && searchMatch
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
          {filteredDrinks && filteredDrinks.length > 0 ?
            filteredDrinks.map((item) => (
              <CardBartenders
                key={item.id}
                dishes={item.dishes}
                volume={item.volume}
                category={item.category}
                name={item.name}
                structure={item.structure}
                technology={item.technology}
              />
            )):
            <p>Ничего не найдено</p>
          }
        </div>
      </div>
    </>
  );
};

export default BodyBartenders;
