import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import boutiqueLogo from './imagenes/boutique.png'
import { CarritoContext } from "./CarritoContext";

function NavBarCarrito() {

  const { carrito } = useContext(CarritoContext);
  const totalItems = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  const badgeText = totalItems > 99 ? '99+' : totalItems;
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevTotal, setPrevTotal] = useState(totalItems);

  useEffect(() => {
    if (totalItems > prevTotal) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
    setPrevTotal(totalItems);
  }, [totalItems, prevTotal]);

  const badgeClass = `cart-badge${totalItems > 99 ? ' cart-badge--large' : ''}${isAnimating ? ' cart-badge--animate' : ''}`;

  const menuItems = [
    { to: '/', label: 'Inicio', icon: faHome },
    { to: '/products', label: 'Catálogo general', icon: faShoppingBag },
    { to: '/cart', label: 'Carrito', icon: faShoppingCart },
  ];

    return (
        <header>
            <img src={boutiqueLogo} alt="Boutique Logo" className="navbar-logo" />
            <nav className="navbar-products-store">
                <dl className="navbar-links">
                    {menuItems.map(({ to, label, icon }) => (
                        <li key={to} className={label === 'Carrito' ? 'navbar-link-cart' : ''}>
                            <NavLink to={to} end={to === '/'} className={({ isActive }) => `navbar-link${isActive ? ' navbar-link--active' : ''}`}>
                                <span className="navbar-link-label">{label}</span>
                                <span className="navbar-link-icon">
                                    <FontAwesomeIcon icon={icon} />
                                    {label === 'Carrito' && <span className={badgeClass}>{badgeText}</span>}
                                </span>
                            </NavLink>
                        </li>
                    ))}
                </dl>
            </nav>
        </header>

    )
}

export default NavBarCarrito;