import CardWaiters from "@/components/Waiters/CardWaiters/CardWaiters";
import "./bodyWaiters.scss";
import React, { useState } from "react";
import { request } from "@/utils/req";
import type { CardsForWaiters } from "@/types/cardT";
import TopLevelBody from "@/components/topLevelBody/TopLevelBody";
import FormAddDrinksWaiters from "@/components/Forms/FormAddDrinksWaiters/FormAddDrinksWaiters";
import { useDrinkForm } from "@/lib/hooks/useDrinkForm";
import { waiters } from "@/lib/api/routes";
import { useDeleteWaitersCardMutation, useFetchAllWaitersMenuQuery } from "@/store/service/WaitersService";




const BodyWaiters = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const token = sessionStorage.getItem('token')

  const { data: cardsWaiters } = useFetchAllWaitersMenuQuery()

  const [deleteCard, { }] = useDeleteWaitersCardMutation()

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };


  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setSelectedCategory('');
  }


  const handleDelete = async (drink: CardsForWaiters) => {
    if (window.confirm('Вы уверены, что хотите удалить этот напиток?')) {
      await deleteCard(drink)
    }
    return
  }

  const handleChange = async (id: string, dataDr: CardsForWaiters) => {
    await request<CardsForWaiters>(`${waiters}/${id}`, "PATCH", dataDr, token)
  }

  const { openForCreate, isFormOpen, close, editingDrink } = useDrinkForm<CardsForWaiters>()

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

        <button className="addNewCardBtn" onClick={openForCreate}>➕ Добавить напиток</button>

        
        <div className="body_cards">

          {isFormOpen &&
            <div className="active">
              <FormAddDrinksWaiters setActive={close} initialData={editingDrink} />
            </div>
          }

          {filteredDrinks && filteredDrinks?.length > 0 ?
            filteredDrinks.map((drink) => (
              <CardWaiters
                key={drink._id}
                drink={drink}
                onDelete={handleDelete}
                handleChange={handleChange}
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
