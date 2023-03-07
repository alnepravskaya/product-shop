import classes from './Card.module.css';
import Modal from '../UI/Modal/Modal';
import React, { useContext, useState } from 'react';
import CardContext from '../../store/cart-context';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout/Checkout';

const Card = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const { totalAmount, items, addItem, removeItem, clearCard } = useContext(CardContext);
  const totalAmountValue = `$${totalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  const CartItemRemoveHandler = (id) => {
    removeItem(id);
  };
  const CartItemAddHandler = (item) => {
    addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsErrorShown(false);
    try {
      await fetch('https://user-hooks-default-rtdb.firebaseio.com/order.json', {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: items
        })
      });
      clearCard();
    } catch (e) {
      console.log(e);
      setIsErrorShown(true);
    }

    setIsSubmitted(true);
  };

  return (
    <Modal onClose={props.onClose}>
      <>
        {isSubmitted ? (
          <p>Successfully sent the order</p>
        ) : (
          <>
            <div>
              <ul className={classes.carts}>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    amount={item.amount}
                    name={item.name}
                    price={item.price}
                    onRemove={CartItemRemoveHandler.bind(null, item.id)}
                    onAdd={CartItemAddHandler.bind(null, item)}
                  />
                ))}
              </ul>
              <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmountValue}</span>
              </div>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}

            {!isCheckout && (
              <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>
                  Close
                </button>
                {hasItems && (
                  <button className={classes.button} onClick={orderHandler}>
                    Order
                  </button>
                )}
              </div>
            )}
            {isErrorShown && isCheckout && <p>We have a problem with server. Try later</p>}
          </>
        )}
      </>
    </Modal>
  );
};

export default Card;
