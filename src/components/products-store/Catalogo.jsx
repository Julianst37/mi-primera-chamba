import useFetch from "../../utils/useFetch";
import CardProductos from "./CardProductos";
import Loading from "./Loading";
import Error from "../../utils/Error";

function Catalogo(){

   const { data, loading, error } = useFetch("https://fakestoreapi.com/products");

    return(
        <div className="catalogo-container" style={{textAlign: 'center'}}>
            <h1>Catálogo de Productos</h1>
            {loading && <Loading />}
            {error && <Error mensajeError={`Error al cargar productos: ${error.message}`} />}
            <div className="catalogo-grid">
                {data && data.map(producto => (
                    <CardProductos key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    )
}

export default Catalogo;