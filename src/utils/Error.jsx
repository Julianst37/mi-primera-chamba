function Error({mensajeError})
{
    return(
        <div className="error-mensaje">
            <h3>Ha ocurrido un error!</h3>
            <p>{mensajeError}</p>
        </div>
    )

}

export default Error;