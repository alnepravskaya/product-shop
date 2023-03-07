import classes from './Checkout.module.css';
import useInput from '../../../hooks/use-input';

const isNotEmpty = (value) => value.trim() !== '';
const isMoreFiveChars = (value) => value.trim().length >= 5;
const Checkout = (props) => {
  const {
    value: name,
    isValid: isNameValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(isNotEmpty);

  const {
    value: street,
    isValid: isStreetValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput
  } = useInput(isNotEmpty);

  const {
    value: postalCode,
    isValid: isPostalCodeValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangedHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCodeInput
  } = useInput(isMoreFiveChars);

  const {
    value: city,
    isValid: isCityValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput
  } = useInput(isNotEmpty);

  const confirmHandler = (e) => {
    e.preventDefault();

    const formIsValid = isNameValid && isStreetValid && isPostalCodeValid && isCityValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name,
      street,
      postalCode,
      city
    });

    resetNameInput();
    resetStreetInput();
    resetPostalCodeInput();
    resetCityInput();
  };

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div className={`${classes.control} ${nameInputHasError ? classes.invalid : ''}`}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          value={name}
          onBlur={nameBlurHandler}
          onChange={nameChangedHandler}
        />

        {nameInputHasError && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${streetInputHasError ? classes.invalid : ''}`}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onBlur={streetBlurHandler}
          onChange={streetChangedHandler}
        />
        {streetInputHasError && <p>Please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${postalCodeInputHasError ? classes.invalid : ''}`}>
        <label htmlFor="postal">Post Code</label>
        <input
          type="text"
          id="postal"
          value={postalCode}
          onBlur={postalCodeBlurHandler}
          onChange={postalCodeChangedHandler}
        />
        {postalCodeInputHasError && <p>Please enter a valid postal code(5 chars min)</p>}
      </div>
      <div className={`${classes.control} ${cityInputHasError ? classes.invalid : ''}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onBlur={cityChangedHandler}
          onChange={cityChangedHandler}
        />
        {cityInputHasError && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
