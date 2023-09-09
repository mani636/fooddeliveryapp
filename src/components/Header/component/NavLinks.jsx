import { links } from '../../../constant/NavLink';
import { Link } from 'react-scroll';

const NavLink = () => {
  return (
    <ul>
      {links.map(({ id, link }) => {
        return (
          <li key={id}>
            <Link to={link} smooth duration={500}>
              {link}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLink;
