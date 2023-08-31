import './Footer.css';
import RowContainer from './components/RowContainer/RowContainer';
import RowContentContainer from './components/RowContentContainer/RowContentContainer';

const Footer = () => {
  return (
    <div className='footer'>
      <RowContainer />
      <RowContentContainer />
      <div className='footer-container'>
        <span>© 2023-All rights reserved.</span>
        <p>
          Developed with by <span className='heart-img'>❤</span> Manikandan Raj
        </p>
      </div>
    </div>
  );
};

export default Footer;
