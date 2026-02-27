import CardWaiters from "@/components/Waiters/CardWaiters/CardWaiters";
import "./bodyWaiters.scss";
import React, { useEffect, useState } from "react";
import { request } from "@/utils/req";
import type { CardsForWaiters } from "@/types/cardT";
import TopLevelBody from "@/components/topLevelBody/TopLevelBody";
import FormAddDrinksWaiters from "@/components/Forms/FormAddDrinksWaiters/FormAddDrinksWaiters";
import { useDrinkForm } from "@/lib/hooks/useDrinkForm";
import { waiters } from "@/lib/api/routes";




const BodyWaiters = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cardsWaiters, setCardsWaiters] = useState<CardsForWaiters[] | undefined>();

  const token = sessionStorage.getItem('token')
  const fetchDrinks = async () => {
    const {data, error} = await request<CardsForWaiters[]>(waiters, 'GET', undefined, token);
    console.log(data)
      try {
        if(error) throw new Error('Не удалось получить данные')
        setCardsWaiters(data);
      } catch (error) {
        error instanceof Error ? error.message : 'Неизвестная ошибка' 
      }
  }
  useEffect(() => {
    fetchDrinks()
  }, []);

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);

  };
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setSelectedCategory('');
  }
  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот напиток?')) {
      await request(`${waiters}/${id}`, 'DELETE', undefined, token)
      setCardsWaiters(prev => prev?.filter(drink => drink._id !== id) || undefined);
    }

  }
  const handleChange = async(id: string, dataDr: CardsForWaiters) => {
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

        <div className="body_cards">
          <button onClick={openForCreate}>➕ Добавить напиток</button>

          {isFormOpen &&
            <div className="active">
              <FormAddDrinksWaiters setActive={close} initialData={editingDrink} fetchDrinks={fetchDrinks}/>
            </div>
          }

          {filteredDrinks && filteredDrinks?.length > 0 ?
            filteredDrinks.map((drink) => (
              <CardWaiters
                key={drink._id}
                drink={drink}
                onDelete={handleDelete}
                fetchDrinks={fetchDrinks}
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
