import { createContext, useState, useContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [image, setImage] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [age, setAge] = useState();
  const [gander, setGander] = useState();

  const getUserProfile = () => {
    const filterUser = state.profileData.find((item) => item.email === email);

    if (filterUser) {
      if (filterUser === 'undefined') {
        setFirstName();
        setSelectCity();
        setGender();
        setImage();
        setNumber();
      } else {
        setIsEditing(true);
        setId(filterUser.id);
        setEmail(filterUser.email);
        setName(filterUser.name);
        setSelectCity(filterUser.selectCity);
        setGender(filterUser.gender);
        setImage(filterUser.image);
        setNumber(filterUser.number);
      }
    }
  };

  return <UserContext.Provider>{children}</UserContext.Provider>;
};

export const UserConsumer = () => {
  return useContext(UserContext);
};
