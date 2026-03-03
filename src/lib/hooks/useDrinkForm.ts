
import { useState } from "react"

export const useDrinkForm = <T>() => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingDrink, setEditingDrink] = useState<T | null>(null)

    const openForCreate = () => {
        setEditingDrink(null)
        setIsFormOpen(true)
    }

    const openForEdit = (drink: T) => {
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