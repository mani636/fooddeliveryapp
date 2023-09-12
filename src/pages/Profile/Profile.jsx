import React, { useEffect, useState } from 'react';
import './Profile.css';
import { BiSolidPencil } from 'react-icons/bi';
import { useStateValue } from '../../context/StateProvider';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase.config';
import { getUserInfo } from '../../utils/firebaseFunction';
import { actionType } from '../../context/reducer';

const Profile = () => {
  const [{ userDetails, user, dispatch }] = useStateValue();

  const [data, setData] = useState();
  const [loginUserEmail, setLoginUserEmail] = useState(user.email);

  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [image, setImage] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [age, setAge] = useState();
  const [gander, setGander] = useState();
  const [modifiedField, setModifiedField] = useState({});

  const userProfile = () => {
    console.log(userDetails);
    const filterUser =
      userDetails && userDetails.find((user) => user.email === loginUserEmail);

    if (userDetails && filterUser) {
      setId(filterUser.id);
      setEmail(filterUser.email);
      setFirstName(filterUser.firstName);
      setLastName(filterUser.lastName);
      setGander(filterUser.gander);
      setAge(filterUser.age);
      setImage(filterUser.image);
      setPhoneNo(filterUser.phoneNo);
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  const userInfoDetails = async () => {
    await getUserInfo().then((data) => {
      dispatch({
        type: actionType.SET_USER_DETAILS,
        userDetails: data,
      });
    });
  };

  const updatedUserProfile = async () => {
    const documentRef = doc(firestore, 'users', id);
    try {
      await updateDoc(documentRef, {
        id,
        firstName,
        lastName,
        // image,
        email,
        gander,
        age,
        phoneNo,
      });

      // userInfoDetails();
      console.log(
        id,
        firstName,
        lastName,

        email,
        gander,
        age,
        phoneNo
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='profile'>
      <div key={id}>
        <div className='profile-top-container'>
          <h1>Personal Info</h1>
          <div className='profile-img-container'>
            <img src={image} alt={firstName} />
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
                <input
                  type='text'
                  id='firstname'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className='name'>
                <label htmlFor='lastname'>Last name*</label>
                <input
                  type='text'
                  id='lastname'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className='name-container'>
              <div className='name'>
                <label htmlFor='gander'>Gander*</label>
                <select
                  id='gander'
                  value={gander}
                  onChange={(e) => setGander(e.target.value)}
                >
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </select>
              </div>

              <div className='name'>
                <label htmlFor='age'>Age*</label>
                <input
                  type='number'
                  id='age'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='name'>
                <label htmlFor='phoneno'>Phone No*</label>
                <input
                  type='number'
                  id='phoneno'
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <button className='profile-update-btn' onClick={updatedUserProfile}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
