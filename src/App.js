import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals/Meals';
import { useEffect, useState } from 'react';
import CardProvider from './store/CardProvider';
import Card from './components/Card/Card';

function App() {
  const [isCardShown, setCartIsShown] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('fixed', isCardShown);
  }, [isCardShown]);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CardProvider>
      <Header onShowCard={showCartHandler} />
      {isCardShown && <Card onClose={hideCartHandler} />}

      <main>
        <Meals />
      </main>
    </CardProvider>
  );
}

export default App;
