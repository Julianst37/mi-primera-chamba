import Button from '@mui/material/Button';

function Error({mensajeError, errorImage})
{
    return(
        <div className="error-mensaje">
            <h3>Ha ocurrido un error!</h3>
            <img src={errorImage} alt="Error" className="error-imagen" />
            <p>{mensajeError}</p>
            <Button variant="contained">Hello world</Button>
        </div>
    )

}

export default Error;