import React, { useState } from "react";
import CardBartenders from "../CardBartenders/CardBartenders";
import type { CardsForBartenders } from "@/types/cardT";
import TopLevelBody from "@/components/topLevelBody/TopLevelBody";
import { useDrinkForm } from "@/lib/hooks/useDrinkForm";
import FormAddDrinksBartenders from "@/components/Forms/FormAddDrinksBartenders/FormAddDrinksBartenders";
import { useDeleteBartendersCardMutation, useFetchAllBartendersMenuQuery } from "@/store/service/BartendersService";
import './bodyBartenders.scss'
import { CardErrorFallback } from "@/components/Waiters/BodyWaiters/BodyWaiters";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";




const BodyBartenders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: cardsBartenders } = useFetchAllBartendersMenuQuery()
  const [deleteCard, { }] = useDeleteBartendersCardMutation()


  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedCategory('');
  };
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };


  const handleDelete = async (card: CardsForBartenders) => {
    if (window.confirm('Вы уверены, что хотите удалить этот напиток?')) {
      await deleteCard(card)
    }
  }

  const { openForCreate, isFormOpen, close, editingDrink } = useDrinkForm<CardsForBartenders>()

  const filteredDrinks = cardsBartenders?.filter((drink) => {
    const categoryMatch =
      selectedCategory === "" || selectedCategory === drink.category;

    const searchMatch =
      drink.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      drink.structure.some(item => item.nameStructure.toLowerCase().includes(searchQuery.trim().toLowerCase()))


    return categoryMatch && searchMatch
  });

  return (
    <>
      <div className="body-bartenders">
        <TopLevelBody
          searchQuery={searchQuery}
          handleSearchQuery={handleSearchQuery}
          selectedCategory={selectedCategory}
          handleChangeCategory={handleChangeCategory}
        />

        <button className="addNewCardBtn" onClick={openForCreate}>➕ Добавить напиток</button>
        <div className="body-cards-bartenders">

          {isFormOpen &&
            <div className="active">
              <FormAddDrinksBartenders setActive={close} initialData={editingDrink} />
            </div>
          }

          {filteredDrinks && filteredDrinks.length > 0 ?
            filteredDrinks.map((drink) => (
              <ErrorBoundary fallback={<CardErrorFallback />}>
                <CardBartenders
                  key={drink._id}
                  drink={drink}
                  handleDelete={handleDelete}
                />
                
              </ErrorBoundary>
            )) :
            <p>Ничего не найдено</p>
          }
        </div>
      </div>
    </>
  );
};

export default BodyBartenders;
