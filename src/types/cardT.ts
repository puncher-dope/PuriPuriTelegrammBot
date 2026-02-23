export type CardsForWaiters = {
  id?: string;
  name: string;
  category: "wine" | "vodka" | "cognac" | "wisky" | "coffee" | "coctail" | "limonade" | undefined;
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
  id: number;
  name: string;
  volume: string
  dishes: string
  category: string;
  structure: CardsForBartendersStructure[];
  technology: string
};
