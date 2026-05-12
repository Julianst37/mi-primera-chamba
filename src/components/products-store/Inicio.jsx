import { Link } from 'react-router-dom';
import './Inicio.css';

function Inicio()
{
  const menuItems = [
    { to: '/historico', label: 'Histórico valores' },
    { to: '/actualizaciones', label: 'Última actualización' },
    { to: '/divisas', label: 'Convertir divisas' },
    { to: '/publicaciones', label: 'Publicaciones' },
    { to: '/compraBTC', label: 'Comprar BTC' },
  ];

  return (
    <div className="inicio-tienda">
      <h1>Bienvenido al Bitcoin Dashboard</h1>
      <div className="cards-container">
        {menuItems.map(({ to, label }) => (
          <Link key={to} to={to} className="card-link">
            <div className="card-menu">
              <h2 className="card-title">{label}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Inicio;