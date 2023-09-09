import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useStateValue } from '../../context/StateProvider';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider, firestore } from '../../firebase/firebase.config';
import { actionType } from '../../context/reducer';
import { addDoc, collection } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowLogin, setIsShowLogin] = useState(false);
  const navigate = useNavigate();
  const [{ user, isLogin }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        const response = userCredential.user;

        // addDoc(collection(firestore, 'users'), {
        //   id: user.uid,
        //   firstName: 'NULL',
        //   lastName: 'NULL',
        //   image: 'NULL',
        //   email: user.email,
        //   gander: 'NULL',
        //   age: 'NULL',
        //   phoneNo: 'NULL',
        // });

        dispatch({
          type: actionType.SET_USER,
          user: response.providerData[0],
          isLogin: !isLogin,
        });

        localStorage.setItem('user', JSON.stringify(response.providerData[0]));

        navigate('/');
      })
      .catch((error) => {
        console.log(error.Message);
        console.log(error.Code);
      });
  };

  const login = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        dispatch({
          type: actionType.SET_USER,
          user: user.providerData,
          isLogin: !isLogin,
        });

        localStorage.setItem('user', JSON.stringify(user.providerData[0]));

        navigate('/');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  const showTestLogin = () => {
    setIsShowLogin(!isShowLogin);
  };

  return (
    <div className='login'>
      <form className='login-container'>
        <h1>Login</h1>
        <div className='login-input-box'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='login-input-box'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='button' className='login-btn' onClick={login}>
          Login
        </button>
        <div className='login-test-credential-btn'>
          <button
            type='button'
            className='login-credential-btn'
            onClick={showTestLogin}
          >
            Test Credentials
          </button>
          {isShowLogin && (
            <div>
              <p>Email: test@gmail.com</p>
              <p>Password: test@123</p>
            </div>
          )}
        </div>

        <div className='login-with-google'>
          <span>or with signin</span>
          <button
            type='button'
            className='google-btn'
            onClick={loginWithGoogle}
          >
            <FcGoogle className='google-icon' />
            <p>Signin with Google</p>
          </button>
        </div>

        <div className='signup-box'>
          <span>
            Don't have an account?<Link to='/'>Signup</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
