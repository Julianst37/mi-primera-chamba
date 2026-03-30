import { NavLink } from 'react-router-dom'

function Header() {
  const menuItems = [
    { to: '/', label: 'Inicio' },
    { to: '/historico', label: 'Histórico valores' },
    { to: '/actualizaciones', label: 'Última actualización' },
    { to: '/divisas', label: 'Convertir divisas' },
    { to: '/publicaciones', label: 'Publicaciones' },
  ];

  return (
    <header>
      <p className='header-title'>Bitcoin Dashboard</p>
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
      </nav>
    </header>
  );
}

export default Header;
