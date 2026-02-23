import React, { useEffect, useState } from "react";
import { request } from "@/utils/req";
import CardBartenders from "../CardBartenders/CardBartenders";
import type { CardsForBartenders } from "@/types/cardT";
import TopLevelBody from "@/components/topLevelBody/TopLevelBody";
import { useDrinkForm } from "@/lib/hooks/useDrinkForm";
import FormAddDrinksBartenders from "@/components/Forms/FormAddDrinksBartenders/FormAddDrinksBartenders";

const bartenders = "http://localhost:3000/menuBartenders";

const BodyBartenders = () => {
  const [cardsBartenders, setCardsBartenders] = useState< CardsForBartenders[] | null>(null);
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

  const {openForCreate, isFormOpen, close, editingDrink} = useDrinkForm<CardsForBartenders>()

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
          <button onClick={openForCreate}>➕ Добавить напиток</button>

          {isFormOpen && 
          <div className="active">
            <FormAddDrinksBartenders setActive={close} initialData={editingDrink}/>
          </div>
          }

          {filteredDrinks && filteredDrinks.length > 0 ?
            filteredDrinks.map((drink) => (
              <CardBartenders
                key={drink.id}
                drink={drink}
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
