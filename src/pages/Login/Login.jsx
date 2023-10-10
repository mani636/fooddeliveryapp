import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useStateValue } from '../../context/StateProvider';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider, firestore } from '../../firebase/firebase.config';
import { actionType } from '../../context/reducer';
import { useUserContext } from '../../context/UserContext';
import { setDoc, doc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [{ user, isLogin }, dispatch] = useStateValue();

  const { setLoginUser } = useUserContext();

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        const response = userCredential.user;

        setLoginUser(response.uid);

        const collectionRef = doc(firestore, 'users', response.uid);

        setDoc(collectionRef, {
          id: response.uid,
          firstName: 'NULL',
          lastName: 'NULL',
          image: 'NULL',
          email: response.email,
          gender: 'NULL',
          age: 'NULL',
          phoneNo: 'NULL',
        });

        dispatch({
          type: actionType.SET_USER,
          user: response.providerData[0],
          isLogin: !isLogin,
        });

        localStorage.setItem('user', JSON.stringify(response.uid));

        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const login = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setLoginUser(user.uid);

        dispatch({
          type: actionType.SET_USER,
          user: user.providerData,
          isLogin: !isLogin,
        });

        localStorage.setItem('user', JSON.stringify(user.uid));

        navigate('/');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  const showTestLogin = () => {
    setEmail('test@gmail.com');
    setPassword('test@123');
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
