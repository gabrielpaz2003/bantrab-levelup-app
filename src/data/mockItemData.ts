
export interface Item {
  id: string;
  name: string;
  price: number;
  emoji: string;
}

export const mockItemData: Item[] = [
  {
    id: '1',
    name: 'New Laptop',
    price: 1200,
    emoji: '💻',
  },
  {
    id: '2',
    name: 'Smartphone',
    price: 800,
    emoji: '📱',
  },
  {
    id: '3',
    name: 'Designer Shoes',
    price: 500,
    emoji: '👠',
  },
  {
    id: '4',
    name: 'Concert Tickets',
    price: 300,
    emoji: '🎟️',
  },
  {
    id: '5',
    name: 'Fancy Dinner',
    price: 150,
    emoji: '🍽️',
  },
];
