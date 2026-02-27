import React, { useEffect, useState } from "react";
import { request } from "@/utils/req";
import CardBartenders from "../CardBartenders/CardBartenders";
import type { CardsForBartenders } from "@/types/cardT";
import TopLevelBody from "@/components/topLevelBody/TopLevelBody";
import { useDrinkForm } from "@/lib/hooks/useDrinkForm";
import FormAddDrinksBartenders from "@/components/Forms/FormAddDrinksBartenders/FormAddDrinksBartenders";
import { bartenders } from "@/lib/api/routes";



const BodyBartenders = () => {
  const [cardsBartenders, setCardsBartenders] = useState<CardsForBartenders[] | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const token = sessionStorage.getItem('token')
  const fetchDrinks = async() => {
    try {
      const { data, error } = await request<CardsForBartenders[]>(bartenders, 'GET', undefined, token);
      if (error) throw new Error('Не удалось получить данные')
      setCardsBartenders(data);
    } catch (error) {
      error instanceof Error ? error.message : 'Неизвестная ошибка'
    }
  }

  useEffect(() => {
    fetchDrinks()
  }, []);

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedCategory('');
  };
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };


    const handleDelete = async (id: string) => {
      if (window.confirm('Вы уверены, что хотите удалить этот напиток?')) {
        await request(`${bartenders}/${id}`, 'DELETE', undefined, token)
        setCardsBartenders(prev => prev?.filter(drink => drink._id !== id) || undefined);
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
              <FormAddDrinksBartenders setActive={close} initialData={editingDrink} fetchDrinks={fetchDrinks}/>
            </div>
          }

          {filteredDrinks && filteredDrinks.length > 0 ?
            filteredDrinks.map((drink) => (
              <CardBartenders
                key={drink._id}
                drink={drink}
                fetchDrinks={fetchDrinks}
                handleDelete={handleDelete}
              />
            )) :
            <p>Ничего не найдено</p>
          }
        </div>
      </div>
    </>
  );
};

export default BodyBartenders;
