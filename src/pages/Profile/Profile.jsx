import React, { useEffect, useState } from 'react';
import './Profile.css';
import { BiSolidPencil } from 'react-icons/bi';

import { useUserContext } from '../../context/UserContext';
import { firestore, storage } from '../../firebase/firebase.config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Profile = () => {
  const { data, setData, userProfile } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    userProfile();
  }, []);

  const [user, setUser] = useState(data);

  const clickHandler = async () => {
    setData(user);
    try {
      const snap = await getDoc(doc(firestore, 'users', user.id));

      if (snap.exists()) {
        await updateDoc(doc(firestore, 'users', user.id), { ...user });
      } else {
        console.log('No such document');
      }
    } catch (err) {
      console.log(err);
    }
    navigate('/');
    toast.success('Profile Update Successfully !');
  };

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [key]: value });
  };

  const uploadImage = async (e) => {
    const imageFile = e.target.files[0];

    try {
      const storageRef = await ref(
        storage,
        `user/${Date.now()}-${imageFile.name}`
      );
      const uploadTask = await uploadBytesResumable(storageRef, imageFile);

      getDownloadURL(storageRef).then((downloadURL) => {
        setUser({ ...user, image: downloadURL });
        toast.success('Image Uploaded Successfully!');
      });
    } catch (err) {
      console.log(`Error Occured while uploading profile image`, err.message);
    }
  };

  return (
    <div className='profile'>
      <div>
        <div className='profile-top-container'>
          <h1>Personal Info</h1>
          <div className='profile-img-container'>
            <img src={data?.image} alt={data?.firstName} />

            <label htmlFor='image' className='edit-img-btn'>
              upload photo
              <input
                type='file'
                accept='image/*'
                name='image'
                className='upload-img'
                id='image'
                onChange={uploadImage}
              />
            </label>
          </div>
        </div>

        <div className='personal-info'>
          <h2>PERSONAL INFO*</h2>
          <p>Provide your Personal Info</p>
          <div className='personal-info-container'>
            <div className='name-container'>
              <div className='name'>
                <label htmlFor='firstName'>Firstname*</label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={user?.firstName}
                  onChange={changeHandler}
                />
              </div>

              <div className='name'>
                <label htmlFor='lastName'>Last name*</label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={user?.lastName}
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className='name-container'>
              <div className='name'>
                <label htmlFor='gender'>Gander*</label>
                <select
                  id='gender'
                  name='gender'
                  value={user?.gender}
                  onChange={changeHandler}
                >
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </select>
              </div>

              <div className='name'>
                <label htmlFor='age'>Age*</label>
                <input
                  type='text'
                  id='age'
                  name='age'
                  value={user?.age}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='contact-info-container'>
          <h2>CONTACT INFO*</h2>
          <p>Provide your Contact Information</p>
          <div className='personal-info-container'>
            <div className='name-container'>
              <div className='name'>
                <label htmlFor='email'>Email ID*</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={user?.email}
                  onChange={changeHandler}
                />
              </div>

              <div className='name'>
                <label htmlFor='phoneNo'>Phone No*</label>
                <input
                  type='text'
                  id='phoneNo'
                  name='phoneNo'
                  value={user?.phoneNo}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
        </div>

        <button className='profile-update-btn' onClick={clickHandler}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
