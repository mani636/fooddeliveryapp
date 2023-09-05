import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../firebase/firebase.config';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const clickHandler = (e) => {
    e.preventDefault();
    signup();
  };

  const signup = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const collectionRef = collection(firestore, 'users');

        addDoc(collectionRef, {
          id: user.uid,
          name: name,
          email: user.email,
        });

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
      });
  };

  return (
    <div className='signup'>
      <form className='form'>
        <h2>SIGN UP</h2>
        <div className='user-input-container'>
          <label htmlFor='name'>Full Name</label>
          <input
            type='text'
            id='name'
            placeholder='Enter your name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='user-input-container'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            id='email'
            placeholder='Enter your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='user-input-container'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='user-input-container'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            type='password'
            id='confirm-password'
            placeholder='confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button className='signup-btn' type='submit' onClick={clickHandler}>
          Submit
        </button>

        <div className='login-box'>
          <span>
            Already have an account?
            <Link to='/login'> Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
