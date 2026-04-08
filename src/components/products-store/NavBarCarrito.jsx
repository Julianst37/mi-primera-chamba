import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import boutiqueLogo from './imagenes/boutique.png'

function NavBarCarrito() {


  const standarItems = [
    { to: '/', label: 'Inicio', icon: faHome },
    { to: '/products', label: 'Catálogo general', icon: faShoppingBag },
  ];

    return (
        <div className="navbar-container-left">
            <img src={boutiqueLogo} alt="Boutique Logo" className="navbar-logo" />
            <nav className="navbar-products-store">
                <ul className="navbar-links">
                    {standarItems.map(({ to, label, icon }) => (
                        <li key={to} className="nav-bar-standar">
                            <NavLink to={to} end={to === '/'} className={({ isActive }) => `navbar-link${isActive ? ' navbar-link--active' : ''}`}>
                                <span className="navbar-link-label">{label}</span>
                                <span className="navbar-link-icon">
                                    <FontAwesomeIcon icon={icon} />
                                </span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default NavBarCarrito;