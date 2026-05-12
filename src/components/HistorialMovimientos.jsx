import { BTCContext } from "./BTCContext";
import { useContext } from "react";
import CardMovimiento from "./CardMovimiento";
import { obtenerTransacciones } from '../services/transaccionesService';

function HistorialMovimientos() {
  const btcContext = useContext(BTCContext);

  const { listaMovimientos } = btcContext;

  const actualizarMovimientos = async () => {
    try {
      const transacciones = await obtenerTransacciones();

      console.log('Transacciones obtenidas para actualizar movimientos:', transacciones);
    } catch (error) {
      console.error('Error al actualizar movimientos:', error);
    }
  };

  return (

    <div className="historial-movimientos">
    <button onClick={actualizarMovimientos} className="btn-actualizar-movimientos">
      Actualizar Movimientos
    </button> 
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