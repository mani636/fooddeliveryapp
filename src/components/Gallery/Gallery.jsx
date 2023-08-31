import './Gallery.css';
import { useStateValue } from '../../context/StateProvider';
import { useEffect, useState } from 'react';

const Gallery = () => {
  const [{ foodItems }] = useStateValue();
  const [data, setData] = useState(foodItems);

  useEffect(() => {
    setData(
      foodItems && foodItems.filter((item) => item.category === 'gallery')
    );
  }, [foodItems]);
  return (
    <div className='gallery'>
      <h1>
        Our <span>Gallery</span>
      </h1>
      <div className='gallery-image-box'>
        {data &&
          data.map((item) => {
            return (
              <div className='gallery-img' key={item.id}>
                <img src={item.imageURL} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <button type='button'>Order Now</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;
