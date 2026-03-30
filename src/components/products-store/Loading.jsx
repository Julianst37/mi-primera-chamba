import boutiqueLogo from './imagenes/boutique.png'

function Loading(){
    return(
        <div className="loading-container">
           <img src={boutiqueLogo} alt="Logo" className="loading-logo" />
           <p className="loading-text">Cargando...</p>
        </div>
    )
}

export default Loading;