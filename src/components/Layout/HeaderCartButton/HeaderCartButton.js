import classes from './HeaderCartButton.module.css';
import CardIcon from '../../Card/CartIcon/CardIcon';
import { useContext, useEffect, useState } from 'react';
import CardContext from '../../../store/cart-context';

const HeaderCartButton = (props) => {
  const { items } = useContext(CardContext);
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);
  const numberOfCardItem = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${isBtnHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsBtnHighlighted(true);
    const timer = setTimeout(() => setIsBtnHighlighted(false), 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CardIcon />
      </span>
      <span>Your Card</span>
      <span className={classes.badge}>{numberOfCardItem}</span>
    </button>
  );
};

export default HeaderCartButton;
