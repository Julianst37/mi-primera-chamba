import carritoVacio from './imagenes/carritovacio.png'
import { NavLink } from 'react-router-dom';

function SinProductos() 
{
    return(
        <div className="sin-productos">
            <h6>No has agregado productos al carrito.</h6>
            <img src={carritoVacio} alt="Carrito vacío" className="imagen-carrito-vacio" />
            <NavLink to="/products" className="volver-catalogo-link">
                <button className="volver-catalogo-boton">Ir a productos</button>
            </NavLink>
        </div>
    )
}

export default SinProductos;