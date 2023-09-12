import Header from './components/Header/Header';
import { AnimatePresence } from 'framer-motion';
import MainContainer from './components/MainContainer/MainContainer';
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems, getUserInfo } from './utils/firebaseFunction';
import { useEffect } from 'react';
import { actionType } from './context/reducer';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase.config';

const App = () => {
  const [{ foodItems, userDetails, isLogin }, dispatch] = useStateValue();
  useEffect(() => {
    const fetchData = async () => {
      await getAllFoodItems().then((data) => {
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: data,
        });
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const userInfoDetails = async () => {
        const data = await getUserInfo();

        dispatch({
          type: actionType.SET_USER_DETAILS,
          userDetails: data,
        });
      };
      userInfoDetails();
    });
  }, []);

  return (
    <AnimatePresence>
      <Routes>
        <Route
          path='/'
          element={
            isLogin ? (
              <div className='main'>
                <Header />
                <main className='main-container'>
                  <MainContainer />
                </main>
              </div>
            ) : (
              <SignUp />
            )
          }
        ></Route>
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
