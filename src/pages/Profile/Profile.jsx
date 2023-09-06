import React, { useEffect, useState } from 'react';
import './Profile.css';
import userImage from '../../assets/chef1.png';
import { BiSolidPencil } from 'react-icons/bi';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase.config';

const Profile = () => {
  const [imageValue, setImageValue] = useState('Upload new picture');

  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    const getUserInfo = async () => {
      const users = await getDocs(query(collection(firestore, 'users')));

      return users.docs.map((doc) => doc.data());
      setData(users);
    };
  }, []);

  return (
    <div className='profile'>
      {data &&
        data.map((data) => {
          <div>
            <div className='profile-top-container'>
              <h1>Personal Info</h1>
              <div className='profile-img-container'>
                <img src={data.image} alt={data.name} />
                <div className='edit-img-box'>
                  <button type='button' className='edit-img-btn'>
                    Edit
                    <BiSolidPencil />
                  </button>
                </div>
              </div>
            </div>

            <div className='personal-info'>
              <h2>PERSONAL INFO*</h2>
              <p>Provide your Personal Info</p>
              <div className='personal-info-container'>
                <div className='name-container'>
                  <div className='name'>
                    <label htmlFor='firstname'>Firstname*</label>
                    <input type='text' id='firstname' value={data.name} />
                  </div>

                  <div className='name'>
                    <label htmlFor='lastname'>Last name*</label>
                    <input type='text' id='lastname' value={data.lastName} />
                  </div>
                </div>

                <div className='name-container'>
                  <div className='name'>
                    <label htmlFor='gander'>Gander*</label>
                    {/* <input type='option' id='gander' /> */}
                    <select id='gander'>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='other'>Other</option>
                    </select>
                  </div>

                  <div className='name'>
                    <label htmlFor='age'>Age*</label>
                    <input type='number' id='age' value={data.age} />
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
                    <input type='email' id='email' value={data.email} />
                  </div>

                  <div className='name'>
                    <label htmlFor='phoneno'>Phone No*</label>
                    <input type='number' id='phoneno' value={data.phoneNo} />
                  </div>
                </div>
              </div>
            </div>

            <button className='profile-update-btn'>Save</button>
          </div>;
        })}
    </div>
  );
};

export default Profile;
