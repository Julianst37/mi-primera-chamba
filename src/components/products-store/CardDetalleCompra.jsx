import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CarritoContext } from "./CarritoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CardDetalleCompra({ producto }) {
    const { eliminarDelCarrito, actualizarCantidad } = useContext(CarritoContext);

    return( 
        <div className="card-detalle-compra">
            <button className="eliminar-producto" onClick={() => eliminarDelCarrito(producto.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <img src={producto.image} alt={producto.title} className="imagen-producto" />
            <div className="detalle-descripcion-compra">
                <h3 className="nombre-producto" style={{fontWeight: "bold"}}>{producto.title}</h3>
                <p className="precio-producto">${producto.price}</p>
                <span>Cantidad:</span>
                <input className="input-cantidad-producto" type="number" min="1" onChange={(e) => actualizarCantidad(producto.id, parseInt(e.target.value))} value={producto.cantidad || 1} />
            </div>

        </div>
    )
}

export default CardDetalleCompra;