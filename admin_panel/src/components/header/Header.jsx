import logo from '../../assets/placeholders/Logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { logoutAdmin } from '../../store/features/auth/authSlice'
import Admin from '../../pages/admin/Admin'


const Header = () => {

  const dispatch = useDispatch()

  return (
    <header>
      <nav className="nav_container">
        <div className="logo_div">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="nav_links_div">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {Admin ? (
              <>
                <li>
                  <NavLink onClick={() => dispatch(logoutAdmin())}>
                    Logout
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-account">My account</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
            
          </ul>
        </div>
      </nav>
    </header>
  )
};

export default Header;
