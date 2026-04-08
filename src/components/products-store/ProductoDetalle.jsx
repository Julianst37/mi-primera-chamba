import { Link, useParams } from "react-router-dom";
import useFetch from "../../utils/useFetch";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BotonAgregarCarrito from "./BotonAgregarCarrito";
import { useContext } from "react";
import { CarritoContext } from "./CarritoContext";

function ProductoDetalle() {
    const { id } = useParams();
    const { data: producto, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);

    const { agregarAlCarrito } = useContext(CarritoContext);

    return(
        <div>
            <h1>Detalle del Producto</h1>
            {loading && <p>Cargando producto...</p>}
            {error && <p>Error al cargar producto: {error.message}</p>}
            {producto && (
                <div className="detalle-producto-carrito">
                    <Link to="/products" className="volver-catalogo"><FontAwesomeIcon icon={faArrowCircleLeft} /> Volver al catálogo</Link>
                    <img src={producto.image} alt={producto.title} className="imagen-producto" />
                    <span className="categoria-producto">{producto.category}</span>
                    <h2 className="nombre-producto">{producto.title}</h2>
                    <p className="descripcion-producto">{producto.description}</p>
                    <p className="precio-producto">${producto.price}</p>
                    <BotonAgregarCarrito producto={producto} agregarAlCarrito={agregarAlCarrito} />
                </div>
            )}
        </div>
    )
}

export default ProductoDetalle;