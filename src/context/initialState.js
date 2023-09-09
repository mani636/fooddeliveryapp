import {
  fetchUser,
  fetchCart,
  fetchLoginInfo,
} from '../utils/fetchLocalStorageData';

const userInfo = fetchUser();
const cartInfo = fetchCart();
const loginInfo = fetchLoginInfo();

export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
  subTotal: 0,
  isLogin: loginInfo,
  userDetails: null,
};
