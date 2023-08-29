import { collection, doc, getDocs, orderBy, query } from 'firebase/firestore';

import { firestore } from '../firebase/firebase.config';

// get all food items

export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, 'foodItems'), orderBy('id', 'desc'))
  );

  return items.docs.map((doc) => doc.data());
};
