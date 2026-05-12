import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleMenuClose()
    navigate('/')
  }

  const handleProfile = () => {
    navigate('/perfil')
    handleMenuClose()
  }
  const menuItems = [
    { to: '/', label: 'Inicio' },
    { to: '/historico', label: 'Histórico valores' },
    { to: '/actualizaciones', label: 'Última actualización' },
    { to: '/publicaciones', label: 'Publicaciones' },
    { to: '/compraBTC', label: 'Comprar BTC' },
    { to: '/formularioBTC', label: 'Assets' },
    ...(isAuthenticated ? [] : [
      { to: '/login', label: 'Iniciar Sesión' },
      { to: '/registro', label: 'Registro' }
    ]),
  ];

  return (
    <header>
      <p className='header-title'>BITC01N REALG4LIFE</p>
      <nav>
        <dl className="navbar-links">
          {menuItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `navbar-link${isActive ? ' navbar-link--active' : ''}`
                }
              >
              <span className="navbar-link-label">{label}</span>
              </NavLink>
            </li>
          ))}
        </dl>

        {/* Sección de usuario autenticado */}
        {isAuthenticated && user && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, gap: 1 }}>
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                textTransform: 'none',
                color: 'inherit',
                padding: 0.5,
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                },
              }}
            >
              <Avatar
                src={user.foto}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                  fontSize: '0.9rem',
                  flexShrink: 0,
                  borderRadius: '8px',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                {user.nombres.charAt(0).toUpperCase()}
              </Avatar>
              <Typography
                sx={{
                  fontWeight: 500,
                  display: { xs: 'none', sm: 'block' },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 150,
                }}
              >
                {user.nombres}
              </Typography>
            </IconButton>

            {/* Menú desplegable */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleProfile}>
                <AccountCircleIcon sx={{ mr: 1 }} />
                Mi perfil
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                🚪 Cerrar sesión
              </MenuItem>
            </Menu>
          </Box>
        )}
      </nav>
    </header>
  );
}

export default Header;
