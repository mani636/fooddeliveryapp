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
  const [lastName, setLastName] = useState('');
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
          lastName: lastName,
          image: 'NULL',
          email: user.email,
          gander: 'NULL',
          age: 'NULL',
          phoneNo: 'NULL',
        });

        setName('');
        setEmail('');
        setPassword('');
        setLastName('');
        navigate('/login');
      })

      .catch((error) => {
        console.log(error.Message);
        console.log(error.Code);
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
          <label htmlFor='last name'>Last Name</label>
          <input
            type='text'
            id='last name'
            placeholder='Enter your last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
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
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
