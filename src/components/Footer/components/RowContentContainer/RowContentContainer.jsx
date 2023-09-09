import './RowContentContainer.css';
import { socialLinks } from '../../../../constant/footerData';

const RowContentContainer = () => {
  return (
    <div className='row-2'>
      <div className='section'>
        <ul>
          <li>India</li>
          <li>USA</li>
          <li>Japan</li>
          <li>Italy</li>
        </ul>
      </div>

      <div className='section'>
        <ul>
          <li>+94 1234567890</li>
          <li>+94 9354879006</li>
          <li>foodshop123@gmail.com</li>
          <li>foodshop@gmail.com</li>
        </ul>
      </div>

      <div className='section'>
        <ul>
          <li>Fast Delivery</li>
          <li>Easy Payment</li>
          <li>24*7 Service</li>
        </ul>
      </div>

      <div className='section'>
        {socialLinks.map(({ id, link, URL }) => {
          return (
            <ul key={id}>
              <li>
                <a href={URL}>{link}</a>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default RowContentContainer;
