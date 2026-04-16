
import { useState } from 'react';
import { FormularioCompraBTC } from '../interfaces/FormularioCompraBTC';

function formularioCompraBTC() {
  const [formData, setFormData] = useState<FormularioCompraBTC>({
    invertion: 0,
    precioActual: '$65.000',
    operacion: 'compra',
  });
    return (
        <div>
            <form>
                <h3>Operar mercado</h3>
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
                <label htmlFor="precioActual">Precio actual BTC</label>
                <input 
                  type="text" 
                  id="precioActual" 
                  name="precioActual" 
                  value={formData.precioActual} 
                  readOnly 
                />
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
                <button type="submit">Comprar</button>
            </form>
        </div>
    );
}

export default formularioCompraBTC;