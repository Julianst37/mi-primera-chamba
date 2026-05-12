import { useState } from 'react';

function FormularioConversion() {
  const [divisa, setDivisa] = useState('Dólar');
  const [divisaDestino, setDivisaDestino] = useState('Euro');
  const [valor, setValor] = useState('');

  const opciones = ['Dólar', 'Euro', 'Yen'];

  // Tasas de cambio (base: Dólar USD)
  const tasasCambio = {
    'Dólar': 1,
    'Euro': 0.92,
    'Yen': 150.50
  };

  const handleConvertir = () => {
    if (valor === '') {
      alert('Por favor ingresa un valor a convertir');
      return;
    }

    // Convertir a Dólar primero (moneda base)
    const valorEnDolar = parseFloat(valor) / tasasCambio[divisa];
    
    // Convertir de Dólar a la moneda destino
    const valorConvertido = valorEnDolar * tasasCambio[divisaDestino];
    
    alert(`${valor} ${divisa} = ${valorConvertido.toFixed(2)} ${divisaDestino}`);
  };

  return (
    <section id="convertir-divisas">
      <form className="conversion-divisas" onSubmit={(e) => e.preventDefault()}>
        <h3 id="titulo-formulario">Convertir divisas</h3>

        <label htmlFor="divisa">Moneda</label>
        <select
          id="divisa"
          value={divisa}
          onChange={(e) => setDivisa(e.target.value)}
        >
          {opciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>

        <label htmlFor="valor">Valor</label>
        <input
          id="valor"
          type="number"
          placeholder="ingrese valor a convertir.."
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <label htmlFor="divisaDestino">Convertir a</label>
        <select
          id="divisaDestino"
          value={divisaDestino}
          onChange={(e) => setDivisaDestino(e.target.value)}
        >
          {opciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>

        <button
          id="boton-convertir"
          type="button"
          onClick={handleConvertir}
        >
          Convertir
        </button>
      </form>
    </section>
  );
}

export default FormularioConversion;
