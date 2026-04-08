import { useContext } from "react";
import { CarritoContext } from "./CarritoContext";
import { Table } from "@mui/material";
import TableComponent from "../../utils/TableComponent";

function ResumenCompra() {

    const { carrito } = useContext(CarritoContext);

    const total = carrito.reduce((acc, producto) => acc + producto.price * (producto.cantidad || 1), 0);

    const headers = ["Producto", "Precio unitario", "Cantidad", "Subtotal"];
    const data = carrito.map(producto => [
        producto.title,
        `$${producto.price}`,
        producto.cantidad || 1,
        `$${(producto.price * (producto.cantidad || 1)).toFixed(2)}`
    ]);

    return (
        <div className="resumen-compra-container">
            <h1>Resumen compra</h1>
            <p>Agradecemos tu compra, ahora puedes proceder con el pago.</p>
            <TableComponent headers={headers} data={data} />
            <div className="total-pago">
                <h4>Total a pagar: ${total.toFixed(2)}</h4>
            </div>
        </div>
    );
}

export default ResumenCompra;