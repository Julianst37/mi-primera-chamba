
import { useState, useContext } from 'react';
import { FormularioCompraBTCProps } from '../interfaces/FormularioCompraBTC';
import { BTCContext } from './BTCContext';

function FormularioCompraBTC() {
  const [formData, setFormData] = useState<FormularioCompraBTCProps>({
    invertion: 0,
    precioActual: '65000',
    operacion: 'compra',
  });

  const btcContext = useContext(BTCContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!btcContext || formData.invertion <= 0) {
      alert('Ingresa un monto válido');
      return;
    }

    const precioNumerico = Number(formData.precioActual.replace(/[^0-9]/g, ''));
    const cantidadBTC = formData.invertion / precioNumerico;

    if (formData.operacion === 'compra') {
      const exito = btcContext.comprarBTC(cantidadBTC, formData.invertion);

      if (exito) {
        alert(`Compra exitosa: ${cantidadBTC.toFixed(8)} BTC`);
      } else {
        alert('No tienes suficiente cash para esta compra');
        return;
      }
    } else {
      const exito = btcContext.venderBTC(cantidadBTC);
      if (exito) {
        alert(`Venta exitosa: ${cantidadBTC.toFixed(8)} BTC`);
      } else {
        alert('No tienes suficiente Bitcoin para vender');
        return;
      }
    }

    setFormData({
      invertion: 0,
      precioActual: formData.precioActual,
      operacion: 'compra',
    });
  };

  return (
    <div>
      <form className='form-shopping-btc' onSubmit={handleSubmit}>
        <p className='titulo-shopping-btc'>Operar mercado</p>
        <div className='inversion-fields'>
          <label htmlFor="invertion">Inversión (USD)</label>
          <input 
            type="number" 
            id="invertion" 
            name="invertion" 
            placeholder="Monto en dólares" 
            value={formData.invertion}
            onChange={(e) => setFormData({...formData, invertion: Number(e.target.value)})}
            required 
          />
        </div>
        <div className='precio-fields'>
          <label htmlFor="precioActual">Precio actual BTC</label>
          <input 
            type="text" 
            id="precioActual" 
            name="precioActual" 
            value={`$${formData.precioActual}`} 
            disabled
          />
        </div>
       
       <div className='operacion-field'>
          <label htmlFor="operacion">Operación</label>
          <select 
            id="operacion" 
            name="operacion" 
            value={formData.operacion}
            onChange={(e) => setFormData({...formData, operacion: e.target.value as 'compra' | 'venta'})}
            required
          >
              <option value="compra">Comprar Bitcoin</option>
              <option value="venta">Vender Bitcoin</option>
          </select>
       </div>
        
        <button className='boton-formulario-btc' style={{marginTop: '10px'}} type="submit">
          {formData.operacion === 'compra' ? 'Comprar' : 'Vender'}
        </button>
      </form>
    </div>
  );
}

export default FormularioCompraBTC;