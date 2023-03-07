import classes from './Header.module.css';
import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';
import mealsImage from '../../../assets/meals.jpeg';

const Header = (props) => {
  return (
    <>
      <div className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton count={1} onClick={props.onShowCard}></HeaderCartButton>
      </div>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full od delicious food!" />
      </div>
    </>
  );
};

export default Header;
