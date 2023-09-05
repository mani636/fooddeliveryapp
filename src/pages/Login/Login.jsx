import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useStateValue } from '../../context/StateProvider';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, provider } from '../../firebase/firebase.config';
import { actionType } from '../../context/reducer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [{ user, isLogin }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const token = credential.accessToken;
        const user = result.user;

        dispatch({
          type: actionType.SET_IS_LOGIN,
          isLogin: !isLogin,
        });
        navigate('/');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const login = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({
          type: actionType.SET_IS_LOGIN,
          isLogin: !isLogin,
        });
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
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
