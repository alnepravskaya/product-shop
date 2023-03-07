import { createContext } from 'react';

const CardContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCard: () => {}
});

export default CardContext;
