export type CardsForWaiters = {
  _id: string;
  name: string;
  category: 'coffee'|'tea'|'warmingTea'|'glintvein'|'mors_uzvar'|'water_juices'|'importedLemonades'|'cocktails'|'lemonades'|'aperitifs'| 'vodka'|'distillates'| 'gin'|'rum'|'whiskey'|'sangrias'|'nastoyki'|'wine'|'tequila'|'cognac'
  volume: string;
  structure: string;
  comment: string;
  description: string;
};

export type CardsForBartendersStructure = {
  _id?: string;
  nameStructure: string;
  unit: string;
  count: string;
};
export type CardsForBartenders = {
  _id: string;
  name: string;
  volume: string
  category: 'coffee'|'tea'|'warmingTea'|'glintvein'|'mors_uzvar'|'water_juices'|'importedLemonades'|'cocktails'|'lemonades'|'aperitifs'| 'vodka'|'distillates'| 'gin'|'rum'|'whiskey'|'sangrias'|'nastoyki'|'wine'|'tequila'|'cognac'|'polufabric'
  dishes: 'Хайбол' | 'Мини-Хайбол' | 'Рокс' | 'Мини-Рокс' |
  'Флюте' | 'Снифтер' | 'Чашка-200' | 'Чашка-300' |
  'Тюльпан' | 'Вино' | 'Эспрессо' | 'Айриш' | 'Шале' | 'Рюмка' | 'Графин' | 'Чайник' | 'Полуфабрикаты'
  structure: CardsForBartendersStructure[];
  technology: string
};
