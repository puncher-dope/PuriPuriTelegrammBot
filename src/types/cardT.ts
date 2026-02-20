export type CardsForWaiters = {
  id: string;
  name: string;
  category: string;
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

export type CardT = {
  menuWaiters: CardsForWaiters[];
  menuBartenders: CardsForBartenders[];
};
