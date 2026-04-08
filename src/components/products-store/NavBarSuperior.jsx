import { UsuarioContext } from './UsuarioContext';
import { CarritoContext } from "./CarritoContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Login from './Login';
import { Avatar, Button, Popover, IconButton, Divider, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

function NavBarSuperior(){

     const { carrito } = useContext(CarritoContext);
     const { usuario, logout } = useContext(UsuarioContext);

     const [show, setShow] = useState(false);
     const totalItems = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
     const badgeText = totalItems > 99 ? '99+' : totalItems;
     const [isAnimating, setIsAnimating] = useState(false);
     const [prevTotal, setPrevTotal] = useState(totalItems);
     const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


       
  useEffect(() => {
    if (totalItems > prevTotal) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
    setPrevTotal(totalItems);
  }, [totalItems, prevTotal]);

  const badgeClass = `cart-badge${totalItems > 99 ? ' cart-badge--large' : ''}${isAnimating ? ' cart-badge--animate' : ''}`;

    return(
        <div className="navbar-superior-container">
              <nav className="navbar-superior">
              <li className="cart-icon navbar-link-right">
                        <NavLink to="/cart" className={({ isActive }) => `navbar-link-superior${isActive ? ' navbar-link--active' : ''}`}>
                            <span className="navbar-link-icon">
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <span className={badgeClass}>{badgeText}</span>
                            </span>
                        </NavLink>
                </li>

                {usuario ? (
                        <li className="navbar-link-right navbar-link-user-container">
                            <IconButton  aria-describedby={id} onClick={(event) => setAnchorEl(event.currentTarget)} variant="contained">
                                     <Avatar alt={usuario.name} src={usuario.avatar}  />
                            </IconButton >
                            <Popover id={id} 
                            open={open} 
                            anchorEl={anchorEl} 
                            onClose={() => setAnchorEl(null)} 
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <Box>
                                    <Typography variant="subtitle1" color="text.primary" sx={{ px: 2, fontWeight: 'bold', pt: 2 }}>
                                        {usuario.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ px: 2, pb: 2 }}>
                                        {usuario.username}
                                    </Typography>
                                </Box>
                                
                                <Divider />
                                <Button 
                                variant="text" 
                                color="error"
                                sx={{p: 1}} 
                                startIcon={<FontAwesomeIcon icon={faSignOutAlt} />
                                } onClick={() => { setAnchorEl(null); logout(); }}>
                                    Cerrar sesión
                                </Button>

                            </Popover>

                            
                        </li>
                    ) : 

                    <li className="navbar-link-right">
                        <button className="navbar-link-superior navbar-link-login" onClick={() => setShow(true)}>
                            <span className="navbar-link-label">Iniciar sesión</span>
                            <span className="navbar-link-icon">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </button>
                    </li>
                } 

                <Login show={show} setShow={setShow} />
            </nav>
        </div>
      
    )
}

export default NavBarSuperior;