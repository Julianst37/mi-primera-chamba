import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "./CarritoContext";
import BotonAgregarCarrito from "./BotonAgregarCarrito";

function CardProductos({ producto }) {

 const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <div className="card-producto">
      <div className="imagen-container">
        <img src={producto.image} alt={producto.title} className="imagen-producto" />
      </div>
      <div className="descripcion-container">
        <h3 className="nombre-producto" style={{fontWeight: "bold"}}>{producto.title}</h3>
        <p className="precio-producto">${producto.price}</p> 
        <Link to={`/products/${producto.id}`} className="enlace-detalles" style={{fontWeight: "bold"}}>
            Ver más
        </Link>
       <BotonAgregarCarrito producto={producto} agregarAlCarrito={agregarAlCarrito} />
      </div>
    </div>
  );
}

export default CardProductos;