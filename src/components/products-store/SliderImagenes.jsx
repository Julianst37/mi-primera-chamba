import { useState } from "react";
import useFetch from "../../utils/useFetch";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "./Loading";

function SliderImagenes() {
    const { data, loading, error } = useFetch("https://fakestoreapi.com/products");
    const [indiceActual, setIndiceActual] = useState(0);
    const imagenesPrevisualizar = data ? data.map(producto => producto.image) : [];

    const siguiente = () => {
        setIndiceActual((prev) =>
        prev === imagenesPrevisualizar.length - 1 ? 0 : prev + 1
        );
    };

      const anterior = () => {
        setIndiceActual((prev) =>
        prev === 0 ? imagenesPrevisualizar.length - 1 : prev - 1
     );
    };
     
    return (
        <div className="slider-container">
            {loading && <Loading />}
            {error && <p>Error al cargar imágenes: {error.message}</p>}
            <div className="slider">

                <button onClick={anterior} className="slider-boton"><FontAwesomeIcon icon={faChevronLeft} /></button>

                {imagenesPrevisualizar.length > 0 && (
                    <img src={imagenesPrevisualizar[indiceActual]} alt={`Imagen ${indiceActual + 1}`} className="slider-imagen" />
                )}

                <button onClick={siguiente} className="slider-boton"><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
        </div>
    );
}

export default SliderImagenes;