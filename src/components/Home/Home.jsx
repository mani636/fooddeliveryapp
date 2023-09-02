import './Home.css';
import MainImg from '../../assets/main_img.png';
import { MdKeyboardArrowRight } from 'react-icons/md';

const Home = () => {
  return (
    <div className='home' name='Home'>
      <div className='men-text'>
        <h1>
          Get Fresh <span>Food</span>
          <br />
          in a Easy Way
        </h1>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
          reiciendis quaerat nobis deleniti amet non inventore. Reprehenderit
          recusandae voluptatibus minus tenetur itaque numquam cum quos dolorem
          maxime. Quas, quaerat nisi. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Cumque facilis, quaerat cupiditate nulla quibusdam
          quo sunt esse tempore inventore vel voluptate, amet laudantium
          adipisci veniam nihil quam molestiae omnis mollitia.
        </p>
        <button className='order-btn'>
          Order Now
          <MdKeyboardArrowRight className='arrow-right' />
        </button>
      </div>

      <div className='main-image'>
        <img src={MainImg} alt='main-img' />
      </div>
    </div>
  );
};

export default Home;
