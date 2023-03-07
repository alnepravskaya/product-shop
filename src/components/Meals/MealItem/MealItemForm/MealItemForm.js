import classes from './MealItemForm.module.css';
import Input from '../../../UI/Input/Input';
import { useContext } from 'react';
import CardContext from '../../../../store/cart-context';

const MealItemForm = (props) => {
  const { items } = useContext(CardContext);

  const inputValue = items.find((item) => item.id === props.id)?.amount || 0;

  const changeInputHandler = (e) => {
    const inputValue = e.currentTarget.value;
    if (inputValue) {
      props.onUpdateToCard(+inputValue);
    }
  };

  return (
    <form className={classes.form}>
      <button onClick={props.onRemoveToCard} type="button" disabled={inputValue === 0}>
        −
      </button>

      <Input
        input={{
          id: 'amount_' + props.id,
          value: inputValue
        }}
        onChange={changeInputHandler}
      />
      <button onClick={props.onAddToCard} type="button">
        +
      </button>
    </form>
  );
};

export default MealItemForm;
