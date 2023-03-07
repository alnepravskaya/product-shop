import CardContext from './cart-context';
import { useReducer } from 'react';

const defaultCardState = {
  items: [],
  totalAmount: 0
};
const cardReducer = (state, action) => {
  if (action.type === 'ADD') {
    const existingCardItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const existingCardItem = state.items[existingCardItemIndex];
    let updatedItem;
    let updatedItems;
    if (existingCardItem) {
      updatedItem = {
        ...existingCardItem,
        amount: action.item.updatedValue || existingCardItem.amount + 1
      };
      updatedItems = [...state.items];
      updatedItems[existingCardItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if (action.type === 'REMOVE') {
    const existingCardItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingCardItem = state.items[existingCardItemIndex];

    let updatedItems = [];

    if (existingCardItem) {
      if (existingCardItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = { ...existingCardItem, amount: existingCardItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCardItemIndex] = updatedItem;
      }
    } else {
      return state;
    }

    const updatedTotalAmount = state.totalAmount - existingCardItem.price;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === 'CLEAR') {
    return defaultCardState;
  }
  return defaultCardState;
};

const CardProvider = (props) => {
  const [cardState, dispatchCardAction] = useReducer(cardReducer, defaultCardState);

  const addItemToCardItem = (item) => {
    dispatchCardAction({ type: 'ADD', item: item });
  };

  const removeItemToCardItem = (id) => {
    dispatchCardAction({ type: 'REMOVE', id });
  };

  const clearCardHandler = () => {
    dispatchCardAction({ type: 'CLEAR' });
  };

  const cardContext = {
    items: cardState.items,
    totalAmount: cardState.totalAmount,
    addItem: addItemToCardItem,
    removeItem: removeItemToCardItem,
    clearCard: clearCardHandler
  };

  return <CardContext.Provider value={cardContext}>{props.children}</CardContext.Provider>;
};

export default CardProvider;
