import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function BotonAgregarCarrito({ producto, agregarAlCarrito }) {
    return (
       <button className="boton-agregar" onClick={() => agregarAlCarrito(producto)}>
         Agregar al carrito <FontAwesomeIcon icon={faCartShopping} />
        </button>
    );
}

export default BotonAgregarCarrito;