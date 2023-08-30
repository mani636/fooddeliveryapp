import './Review.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BiLogoFacebook } from 'react-icons/bi';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { reviews } from '../../constant/data';

const Review = () => {
  return (
    <div className='review'>
      <h1>
        Customer <span>Review</span>
      </h1>

      <div className='review-card-container'>
        {reviews.map(({ id, title, image, desc }) => {
          return (
            <div className='review-card' key={id}>
              <div className='review-user-image'>
                <img src={image} alt={title} />
              </div>

              <div className='review-info'>
                <h2>{title}</h2>
                <div className='review-rating'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <div className='review-user-social-icons'>
                  <BiLogoFacebook />
                  <AiFillInstagram />
                  <AiOutlineTwitter />
                  <FaLinkedinIn />
                </div>
                <p className='reviews'>{desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Review;
