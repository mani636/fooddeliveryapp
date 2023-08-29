import Header from './components/Header/Header';
import { Home, About, Cart, Login, Menu, Review } from './Pages';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainContainer from './components/MainContainer/MainContainer';
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunction';
import { useEffect } from 'react';
import { actionType } from './context/reducer';

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
      <Header />
      <main className='main-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/review' element={<Review />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <MainContainer />
      </main>
    </AnimatePresence>
  );
};

export default App;
