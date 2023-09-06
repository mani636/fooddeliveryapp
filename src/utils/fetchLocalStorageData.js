export const fetchUser = () => {
  const userInfo =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();

  return userInfo;
};

export const fetchCart = () => {
  const cartInfo =
    localStorage.getItem('cartItems') !== 'undefined'
      ? JSON.parse(localStorage.getItem('cartItems'))
      : localStorage.clear();

  return cartInfo ? cartInfo : [];
};

export const fetchLoginInfo = () => {
  const loginInfo =
    localStorage.getItem('isLogin') !== 'undefined'
      ? JSON.parse(localStorage.getItem('isLogin'))
      : localStorage.clear();

  return loginInfo;
};
