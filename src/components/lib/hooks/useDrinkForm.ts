import type { CardsForWaiters } from "@/types/cardT"
import { useState } from "react"

export const useDrinkForm = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingDrink, setEditingDrink] = useState<CardsForWaiters | null>(null)

    const openForCreate = () => {
        setEditingDrink(null)
        setIsFormOpen(true)
    }

    const openForEdit = (drink: CardsForWaiters) => {
        setEditingDrink(drink)
        setIsFormOpen(true)
    }

    const close = () => {
        setIsFormOpen(false)
        setEditingDrink(null)
    }

    return{
        openForCreate,
        openForEdit,
        close,
        isFormOpen,
        editingDrink
    }
}