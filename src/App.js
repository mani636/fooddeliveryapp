import Header from './components/Header/Header';
import { AnimatePresence } from 'framer-motion';
import MainContainer from './components/MainContainer/MainContainer';
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunction';
import { useEffect } from 'react';
import { actionType } from './context/reducer';
import './index.css';

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence>
      <div className='main'>
        <Header />
        <main className='main-container'>
          <MainContainer />
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
