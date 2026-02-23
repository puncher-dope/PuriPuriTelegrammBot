export type CardsForWaiters = {
  id?: string;
  name: string;
  category: "wine" | "vodka" | "cognac" | "wisky" | "coffee" | "coctail" | "limonade";
  volume: string;
  structure: string;
  comment: string;
  description: string;
};

export type CardsForBartendersStructure = {
  id: string;
  nameStructure: string;
  unit: string;
  count: string;
};
export type CardsForBartenders = {
  id?: number;
  name: string;
  volume: string
  category: "wine" | "vodka" | "cognac" | "wisky" | "coffee" | "coctail" | "limonade";
  dishes: 'Хайбол' | 'Мини-Хайбол' | 'Рокс' | 'Мини-Рокс' |
  'Флюте' | 'Снифтер' | 'Чашка-200' | 'Чашка-300' |
  'Тюльпан' | 'Вино' | 'Эспрессо' | 'Айриш' | 'Шале' | 'Рюмка'
  structure: CardsForBartendersStructure[];
  technology: string
};
