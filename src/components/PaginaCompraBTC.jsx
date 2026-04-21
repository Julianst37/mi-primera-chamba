import FormularioCompraBTC from './ShoppingBTC';
import TarjetaSaldoBTC from './TarjetaSaldoBTC';
import HistorialMovimientos from './HistorialMovimientos';

function PaginaCompraBTC() {
  return (
    <div className='pagina-compra-btc'>
      <div className='contenedor-formulario'>
        <TarjetaSaldoBTC />
        <FormularioCompraBTC />
      </div>
      <div className='contenedor-historial'>
        <HistorialMovimientos />
      </div>
    </div>
  );
}

export default PaginaCompraBTC;
