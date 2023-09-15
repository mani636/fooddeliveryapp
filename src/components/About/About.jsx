import './About.css';
import AboutImg from '../../assets/Food-Plate.png';
import { Link } from 'react-scroll';

const About = () => {
  return (
    <div className='about' name='About'>
      <div className='about-left-container'>
        <img src={AboutImg} alt='food-plate-img' />
      </div>

      <div className='about-right-container'>
        <h1>
          About <span>Us</span>
        </h1>
        <h3>Why Choose us?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita,
          est. Doloremque sapiente veritatis laboriosam corrupti optio et
          maxime. Ad, amet explicabo eaque labore cupiditate quasi nostrum nemo
          recusandae id quibusdam? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Doloremque ab, dolores pariatur cum exercitationem,
          illo nisi veritatis vitae ea deleniti fugiat quisquam tempora,
          accusantium corrupti excepturi optio. Inventore, cupiditate
          recusandae.
        </p>
        <Link to='menu'>Order Now</Link>
      </div>
    </div>
  );
};

export default About;
