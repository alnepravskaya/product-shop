import { DUMMY_MEALS } from './constant';
import classes from './AvailableMeals.module.css';
import Card from '../../UI/Card/Card';
import MealItem from '../MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch('https://user-hooks-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    void fetchMeals().catch((error) => {
      console.log(error);
      setHttpError('Something wrong with data from server. You see dummy data');
      setMeals(DUMMY_MEALS);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <section className={classes.mealsLoading}>
          <p>Loading...</p>
        </section>
      ) : (
        <>
          {httpError && <p className={classes.error}>{httpError}</p>}
          <section className={classes.meals}>
            <Card>
              <ul>
                {meals.map((meal) => (
                  <MealItem {...meal} key={meal.id}></MealItem>
                ))}
              </ul>
            </Card>
          </section>
          )
        </>
      )}
    </>
  );
};

export default AvailableMeals;
