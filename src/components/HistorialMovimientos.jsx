import { BTCContext } from "./BTCContext";
import { useContext } from "react";
import CardMovimiento from "./CardMovimiento";

function HistorialMovimientos() {
  const btcContext = useContext(BTCContext);

  const { listaMovimientos } = btcContext;

  return (
    <div className="historial-movimientos">
      <h2 className="titulo-historial">Historial de Movimientos</h2>
      {listaMovimientos && listaMovimientos.length > 0 ? (
        listaMovimientos.map((movimiento) => (
          <CardMovimiento key={movimiento.id} movimiento={movimiento} />
        ))
      ) : (
        <p className="sin-movimientos">No hay movimientos registrados.</p>
      )}
    </div>  
  );
}

export default HistorialMovimientos;