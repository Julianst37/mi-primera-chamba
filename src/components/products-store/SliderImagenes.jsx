import { useState } from "react";
import useFetch from "../../utils/useFetch";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "./Loading";
import Error from "../../utils/Error";
import errorImage from './imagenes/error.png'

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
            {error && <Error mensaje={error}  errorImage={errorImage}/>}
            {imagenesPrevisualizar.length > 0 && (
                 <div className="slider">
                     
                    <button onClick={anterior} className="slider-boton"><FontAwesomeIcon icon={faChevronLeft} /></button>

                    <img src={imagenesPrevisualizar[indiceActual]} alt={`Imagen ${indiceActual + 1}`} className="slider-imagen" />

                    <button onClick={siguiente} className="slider-boton"><FontAwesomeIcon icon={faChevronRight} /></button>
       
                </div>
            )}
        </div>
    );
}

export default SliderImagenes;