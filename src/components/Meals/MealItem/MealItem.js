import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm/MealItemForm';
import { useContext } from 'react';
import CardContext from '../../../store/cart-context';

const MealItem = (props) => {
  const { addItem, removeItem } = useContext(CardContext);
  const addToCardHandler = () => {
    addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: 1
    });
  };

  const updateToCardHandler = (updatedValue) => {
    addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: updatedValue,
      //value: updatedValue,
      updatedValue
    });
  };

  const removeToCardHandler = () => {
    removeItem(props.id);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>${props.price}</div>
      </div>
      <div>
        <MealItemForm
          onAddToCard={addToCardHandler}
          onRemoveToCard={removeToCardHandler}
          onUpdateToCard={updateToCardHandler}
          id={props.id}
        />
      </div>
    </li>
  );
};

export default MealItem;
