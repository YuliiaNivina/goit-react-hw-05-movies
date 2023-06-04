import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <NavLink className="navlink" to="/">
      Home
    </NavLink>
    <NavLink className="navlink" to="/movies">
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
