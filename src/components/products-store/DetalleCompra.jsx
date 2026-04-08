import { useContext, useState } from "react";
import { CarritoContext } from "./CarritoContext";
import CardDetalleCompra from "./CardDetalleCompra";
import ModalPersonalizada from "../../utils/ModalPersonalizada";
import AccordionPersonalizado from "../../utils/Accordion";
import FormularioCliente from "./FormularioCliente";
import DatosEnvio from "./DatosEnvio";
import { UsuarioContext } from "./UsuarioContext";
import Login from "./Login";
import SinProductos from "./SinProductos";
import { Box, Button } from "@mui/material";
import ResumenCompra from "./ResumenCompra";
import PaymentForm from "../../utils/PaymentForm";

function DetalleCompra(){
    const { carrito } = useContext(CarritoContext);
    const { usuario } = useContext(UsuarioContext);
    
    const [show, setShow] = useState(false);
    const [step, setStep] = useState(1);

    const stepsText = {
        1: "Revisa los detalles de tu compra",
        2: "Procede con el pago",
        3: "Finalizar compra"
    }

    return(
        <div>
           {!usuario ? (
                <div className="login-container">
                    <p>Aún no has iniciado sesión, debes ingresar para finalizar la compra.</p>
                    <button className="login-boton" onClick={() => setShow(true)}>Iniciar sesión</button>
                    <Login show={show} setShow={setShow} />
                </div>
            ) : ( carrito.length === 0 ? (
                <div className="detalle-compra-informacion">
                    <SinProductos />
                </div>
            ) : (   

            <div className="detalle-compra-informacion">

                <p>paso {step}/3</p>
              
                {step === 1 && (
                    <div className="paso-info-compra">   

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

                        <AccordionPersonalizado header="Información de envío" body={
                            <div className="info-envio-container">
                                <DatosEnvio />
                            </div>
                        } index={2} />

                    </div>
                )}

                {step === 2 && ( 
                    <div className="paso-pago-compra">
                        <ResumenCompra />
                    </div>
                )}

                {step === 3 && (
                    <PaymentForm /> 
                )}        
                
                <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                    <Button sx={{ display: step === 3 ? 'none' : 'block', width: 'auto' }} variant="contained" onClick={() => setStep(step + 1)}>{stepsText[step]}</Button>
                </Box>
             </div>
             ))}
        </div>
    )
}

export default DetalleCompra;