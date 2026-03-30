import { useContext, useState, useEffect } from "react";
import { CarritoContext } from "./CarritoContext";
import CardDetalleCompra from "./CardDetalleCompra";
import CarritoVacio from "./imagenes/carritovacio.png";
import { Link, useNavigate } from "react-router-dom";
import userProfile from "../../utils/usuario";
import ModalPersonalizada from "../../utils/ModalPersonalizada";
import AccordionPersonalizado from "../../utils/Accordion";
import FormularioCliente from "./FormularioCliente";

function DetalleCompra(){
    const navigate = useNavigate();
    const { carrito } = useContext(CarritoContext);
    const [estaLogueado, setEstaLogueado] = useState(false);
    const [incorrecto, setIncorrecto] = useState(false);
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const { name, username, password } = userProfile;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (incorrecto) {
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
    }, [incorrecto, navigate]);

    const handleLogin = () => {
         
         if (usernameInput === username && passwordInput === password) {
            alert(`Bienvenido, ${name}!`);
            setEstaLogueado(true);
        } else {
            setIncorrecto(true);
        }
    }

    return(
        <div>
           {!estaLogueado ? (
                <div className="login-container">
                    <p>Aún no has iniciado sesión, debes ingresar para finalizar la compra.</p>
                    <button className="login-boton" onClick={() => setShow(true)}>Iniciar sesión</button>
                    <ModalPersonalizada show={show} onHide={() => setShow(false)}
                        footer={<button className="btn btn-primary" onClick={() => { handleLogin(); setShow(false); }}>Confirmar</button>}>
                        <h2 style={{textAlign:"center"}}>Iniciar sesión</h2>
                        <div className="info-login">
                            <input id="user-name" name="user-name" type="text" placeholder="Username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} className="input-login" />
                             <input id="user-password" name="user-password" type="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="input-login" />
                        </div>
                    </ModalPersonalizada>
                </div>
            ) : 
            carrito.length === 0 ? (
                <div className="carrito-vacio-container">
                    <img src={CarritoVacio} alt="Carrito Vacío" className="carrito-vacio-imagen" />
                    <p className="carrito-vacio-texto">Actualmente no tienes productos en el carrito, puedes agregarlos aquí.</p>
                    <Link to="/products" className="carrito-vacio-boton">Agregar productos</Link>
                </div>
            ) : (
                <div className="detalle-compra-informacion">
                    <AccordionPersonalizado header="Productos comprados" body={
                        <div className="detalle-compra-container">
                            {carrito.map((producto, index) => (
                            <CardDetalleCompra key={index} producto={producto} />
                            ))}
                        </div>
                    } index={0} />  
                
                    <AccordionPersonalizado header="Información del cliente" body={
                        <div className="info-cliente-container">
                            <FormularioCliente />
                        </div>
                    } index={1} />
                </div>
                
            )}
        </div>
    )
}

export default DetalleCompra;